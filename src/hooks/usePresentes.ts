import { useEffect, useState } from "react";

import { supabase } from "../config/supabase";

import type { GiftItem } from "../types/guest";

interface ReservaPendente {
  id: string;
  tipo: "compra" | "pix" | "skip";
  valor: number;
  nome: string;
}

interface PixModalData {
  chave: string;
  nomePresente: string;
  payload: string;
}

function gerarPayloadPixLivre(
  chave: string,
): string {
  const chaveLimpa = chave.trim();

  if (!chaveLimpa) {
    return "";
  }

  const nome = "Casamento".substring(
    0,
    25,
  );

  const cidade = "Brasil".substring(
    0,
    15,
  );

  const padLength = (str: string) =>
    String(str.length).padStart(
      2,
      "0",
    );

  const idChavePix =
    `0014br.gov.bcb.pix01${padLength(
      chaveLimpa,
    )}${chaveLimpa}`;

  const payloadBase = [
    "000201",
    `26${padLength(
      idChavePix,
    )}${idChavePix}`,
    "52040000",
    "5303986",
    "5802BR",
    `59${padLength(nome)}${nome}`,
    `60${padLength(cidade)}${cidade}`,
    "62070503***",
    "6304",
  ].join("");

  let crc = 0xffff;

  for (
    let i = 0;
    i < payloadBase.length;
    i++
  ) {
    crc ^=
      payloadBase.charCodeAt(i)
      << 8;

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc =
          (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
  }

  const crcHex = (
    crc & 0xffff
  )
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");

  return payloadBase + crcHex;
}

export function usePresentes() {
  const [
    presentes,
    setPresentes,
  ] = useState<GiftItem[]>([]);

  const [
    presenteSelecionado,
    setPresenteSelecionado,
  ] = useState<string | null>(null);

  const [
    mensagemSucesso,
    setMensagemSucesso,
  ] = useState("");

  const [
    chavePixCasal,
    setChavePixCasal,
  ] = useState("");

  const [
    reservaPendente,
    setReservaPendente,
  ] =
    useState<ReservaPendente | null>(
      null,
    );

  const [
    mostrarPixModal,
    setMostrarPixModal,
  ] =
    useState<PixModalData | null>(
      null,
    );

  const [
    mensagemConvidado,
    setMensagemConvidado,
  ] = useState("");

  const [
    nomeConvidado,
    setNomeConvidado,
  ] = useState("");

  const [salvando, setSalvando] =
    useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados =
    async (): Promise<void> => {
      const coupleId =
        localStorage.getItem(
          "couple_id",
        );

      if (coupleId) {
        const {
          data: coupleData,
        } = await supabase
          .from("vw_couples")
          .select("pix_key")
          .eq("id", coupleId)
          .single();

        if (coupleData) {
          setChavePixCasal(
            coupleData.pix_key ?? "",
          );
        }
      }

      const {
        data: giftsData,
      } = await supabase
        .from("vw_gifts")
        .select("*")
        .order(
          "is_reserved",
          {
            ascending: true,
          },
        )
        .order(
          "suggested_value",
          {
            ascending: true,
          },
        );

      if (giftsData) {
        setPresentes(
          giftsData as GiftItem[],
        );
      }
    };

  const limparCampos = () => {
    setMensagemConvidado("");
    setNomeConvidado("");
  };

  const iniciarReservaCompra = (
    id: string,
    nome: string,
  ) => {
    limparCampos();

    setReservaPendente({
      id,
      nome,
      valor: 0,
      tipo: "compra",
    });
  };

  const iniciarReservaPix = (
    id: string,
    valor: number,
    nome: string,
  ) => {
    limparCampos();

    setReservaPendente({
      id,
      nome,
      valor,
      tipo: "pix",
    });
  };

  const iniciarNaoPresentear =
    () => {
      limparCampos();

      setReservaPendente({
        id: "skip",
        nome:
          "Confirmação de Presença",
        valor: 0,
        tipo: "skip",
      });
    };

  const confirmarReserva =
    async () => {
      if (!reservaPendente) {
        return;
      }

      setSalvando(true);

      try {
        const textoMensagem =
          mensagemConvidado.trim();

        let mensagemFinal =
          textoMensagem;

        if (
          textoMensagem &&
          nomeConvidado.trim()
        ) {
          mensagemFinal =
            `${textoMensagem}\n\n- Com carinho, ${nomeConvidado.trim()}`;
        }

        const groupId =
          localStorage.getItem(
            "guest_group_id",
          );

        if (
          reservaPendente.tipo ===
          "skip"
        ) {
          if (
            groupId &&
            mensagemFinal
          ) {
            await supabase
              .from(
                "vw_guest_groups",
              )
              .update({
                guest_message:
                  mensagemFinal,
              })
              .eq(
                "id",
                groupId,
              );
          }

          setMensagemSucesso(
            "Presença confirmada com sucesso!",
          );

          setPresenteSelecionado(
            "skip",
          );

          setReservaPendente(
            null,
          );

          return;
        }

        if (
          reservaPendente.tipo ===
          "pix"
        ) {
          const payload =
            gerarPayloadPixLivre(
              chavePixCasal,
            );

          setMostrarPixModal({
            chave:
              chavePixCasal,
            nomePresente:
              reservaPendente.nome,
            payload,
          });

          setReservaPendente(
            null,
          );

          return;
        }

        await supabase
          .from("vw_gifts")
          .update({
            is_reserved: true,
            reservation_type:
              "compra",
            guest_message:
              mensagemFinal ||
              null,
          })
          .eq(
            "id",
            reservaPendente.id,
          );

        setPresentes((prev) =>
          prev.map((item) =>
            item.id ===
            reservaPendente.id
              ? {
                  ...item,
                  is_reserved:
                    true,
                }
              : item,
          ),
        );

        setPresenteSelecionado(
          reservaPendente.id,
        );

        setMensagemSucesso(
          "Presente reservado com sucesso!",
        );

        setReservaPendente(
          null,
        );
      } catch (error) {
        console.error(error);

        alert(
          "Não foi possível concluir a operação.",
        );
      } finally {
        setSalvando(false);
      }
    };

  return {
    presentes,

    presenteSelecionado,

    mensagemSucesso,
    setMensagemSucesso,

    reservaPendente,
    setReservaPendente,

    mostrarPixModal,
    setMostrarPixModal,

    mensagemConvidado,
    setMensagemConvidado,

    nomeConvidado,
    setNomeConvidado,

    salvando,

    iniciarReservaCompra,
    iniciarReservaPix,
    iniciarNaoPresentear,

    confirmarReserva,
  };
}
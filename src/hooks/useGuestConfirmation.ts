import { useState } from "react";

import type {
  GuestGroup,
} from "../types/guest";

import {
  guestConfirmationService,
} from "../services/guestConfirmationService";

export function useGuestConfirmation() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    errorMsg,
    setErrorMsg,
  ] = useState("");

  const [
    familiaCarregada,
    setFamiliaCarregada,
  ] = useState<GuestGroup | null>(
    null
  );

  const [
    membrosConfirmados,
    setMembrosConfirmados,
  ] = useState<string[]>([]);

  const [
    naoIrei,
    setNaoIrei,
  ] = useState(false);

  const carregarFamilia =
    async (token: string) => {
      setLoading(true);
      setErrorMsg("");

      try {
        const familia =
          await guestConfirmationService
            .carregarFamilia(token);

        if (!familia) {
          setErrorMsg(
            "Código não encontrado."
          );
          return;
        }

        setFamiliaCarregada(familia);

        sessionStorage.setItem(
          "guest_group_id",
          String(familia.id)
        );

        const confirmados =
          familia.guests
            .filter(
              (g) =>
                g.status ===
                "confirmed"
            )
            .map((g) => g.id);

        setMembrosConfirmados(
          confirmados
        );

        const todosRecusaram =
          familia.guests.length > 0 &&
          familia.guests.every(
            (g) =>
              g.status ===
              "declined"
          );

        setNaoIrei(
          todosRecusaram
        );
      } catch {
        setErrorMsg(
          "Erro ao carregar convite."
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    errorMsg,

    familiaCarregada,

    membrosConfirmados,
    setMembrosConfirmados,

    naoIrei,
    setNaoIrei,

    carregarFamilia,

    setFamiliaCarregada,
  };
}
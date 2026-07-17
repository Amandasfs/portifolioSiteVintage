import MensagemSucessoModal from "../../component/modal/MensagemSucessoModal";

import GiftSectionTitle from "../../component/presentes/GiftSectionTitle";
import GiftInfoCard from "../../component/presentes/GiftInfoCard";
import GiftGrid from "../../component/presentes/GiftGrid";
import GiftActions from "../../component/presentes/GiftActions";
import MessageModal from "../../component/presentes/MessageModal";
import PixModal from "../../component/presentes/PixModal";

import { usePresentes } from "../../hooks/usePresentes";

export default function PresentesGrid() {
  const {
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
  } = usePresentes();

  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        px-4
        sm:px-6
        py-16
      "
      style={{
        backgroundImage: `
          radial-gradient(
            circle at center,
            #f3e6d0 0%,
            #442d1c 100%
          ),
          url('https://www.transparenttextures.com/patterns/snow.png')
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      }}
    >
      <div
        className="
          mx-auto
          max-w-7xl

          relative
          z-10

          space-y-12
          md:space-y-16
        "
      >
        {/* TÍTULO */}
        <GiftSectionTitle />

        {/* INFORMAÇÕES */}
        <GiftInfoCard
          disabled={
            presenteSelecionado !== null
          }
        />

        {/* GRID DE PRESENTES */}
        <GiftGrid
          presentes={presentes}
          presenteSelecionado={
            presenteSelecionado
          }
          onReservar={
            iniciarReservaCompra
          }
          onPix={
            iniciarReservaPix
          }
        />

        {/* BOTÃO DE CONFIRMAR PRESENÇA */}
        <GiftActions
          disabled={
            presenteSelecionado !== null
          }
          onClick={
            iniciarNaoPresentear
          }
        />

      {/* ======================================== */}
      {/* SUCESSO                                  */}
      {/* ======================================== */}

      {mensagemSucesso && (
        <MensagemSucessoModal
          mensagemPrincipal={
            mensagemSucesso
          }
          citaBiblica={`
"Ninguém jamais viu a Deus; se nos amarmos uns aos outros,
Deus permanece em nós, e o seu amor é aperfeiçoado em nós."

1 João 4:12
          `}
        />
      )}

      {/* ======================================== */}
      {/* MODAL DE MENSAGEM                        */}
      {/* ======================================== */}

      {reservaPendente && (
        <MessageModal
          reservaPendente={
            reservaPendente
          }
          mensagemConvidado={
            mensagemConvidado
          }
          nomeConvidado={
            nomeConvidado
          }
          salvando={salvando}
          onMensagemChange={
            setMensagemConvidado
          }
          onNomeChange={
            setNomeConvidado
          }
          onCancelar={() =>
            setReservaPendente(null)
          }
          onConfirmar={
            confirmarReserva
          }
        />
      )}

      {/* ======================================== */}
      {/* MODAL PIX                                */}
      {/* ======================================== */}

            {mostrarPixModal && (
        <PixModal
          chave={mostrarPixModal.chave}
          nomePresente={mostrarPixModal.nomePresente}
          payload={mostrarPixModal.payload}
          onClose={() =>
            setMostrarPixModal(null)
          }
          onSuccess={() => {
            setMostrarPixModal(null);

            setMensagemSucesso(
              "Muito obrigado! Agradecemos de coração a sua contribuição.",
            );
          }}
        />
      )}

      </div>
    </section>
  );
}
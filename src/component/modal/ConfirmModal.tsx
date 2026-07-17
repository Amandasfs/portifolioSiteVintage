// src/component/ConfirmModal/ConfirmModal.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import cornerImage from "../../assets/img/cornerImage.png";

import ModalHeader from "../../component/confirm/ModalHeader";
import TokenForm from "../../component/confirm/TokenForm";
import GuestList from "../../component/confirm/GuestList";
import ActionButtons from "../../component/confirm/ActionButtons";

import { useGuestConfirmation } from "../../hooks/useGuestConfirmation";
import { guestConfirmationService } from "../../services/guestConfirmationService";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  onClose,
}: ConfirmModalProps) {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const {
    loading,
    errorMsg,

    familiaCarregada,
    setFamiliaCarregada,

    membrosConfirmados,
    setMembrosConfirmados,

    naoIrei,
    setNaoIrei,

    carregarFamilia,
  } = useGuestConfirmation();

  if (!isOpen) {
    return null;
  }

  const toggleMembro = (
    membroId: string,
  ) => {
    if (naoIrei) {
      return;
    }

    setMembrosConfirmados((prev) =>
      prev.includes(membroId)
        ? prev.filter(
            (id) => id !== membroId,
          )
        : [...prev, membroId],
    );
  };

  const handleSalvar = async () => {
    if (!familiaCarregada) {
      return;
    }

    try {
      await guestConfirmationService.salvarConfirmacao(
        familiaCarregada,
        membrosConfirmados,
        naoIrei,
      );

      navigate("/presentes");

      onClose();
    } catch (error) {
      console.error(
        "Erro ao confirmar presença:",
        error,
      );

      alert(
        "Não foi possível salvar sua confirmação.",
      );
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[560px]
        "
      >
        {/* Moldura Externa */}

        <div
          className="
            absolute
            inset-0
            rounded-3xl
            pointer-events-none
          "
          style={{
            border:
              "2px solid #DE9B72",

            boxShadow: `
              0 0 0 3px rgba(222,155,114,.15),
              0 0 0 6px rgba(222,155,114,.08),
              0 10px 40px rgba(0,0,0,.35)
            `,
          }}
        />

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            p-6
            sm:p-8
            shadow-2xl
          "
          style={{
            backgroundColor:
              "#4d6648",

            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/old-wall.png')",
          }}
        >
          {/* Cantos Decorativos */}

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="
              absolute
              top-0
              left-0
              w-16
              h-16
              opacity-90
            "
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="
              absolute
              top-0
              right-0
              w-16
              h-16
              scale-x-[-1]
              opacity-90
            "
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              w-16
              h-16
              scale-y-[-1]
              opacity-90
            "
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="
              absolute
              bottom-0
              right-0
              w-16
              h-16
              scale-x-[-1]
              scale-y-[-1]
              opacity-90
            "
          />

          {/* Filetes dourados */}

          <div
            className="
              absolute
              top-5
              left-10
              right-10
              h-px
              bg-[#DE9B72]/40
            "
          />

          <div
            className="
              absolute
              bottom-5
              left-10
              right-10
              h-px
              bg-[#DE9B72]/40
            "
          />

          <div className="relative z-10">
            <ModalHeader
              title="Sua Presença é Muito Especial"
              subtitle="Por favor confirme sua participação neste momento tão importante para nós."
            />

            {!familiaCarregada && (
              <>
                <TokenForm
                  token={token}
                  loading={loading}
                  onChange={setToken}
                  onSubmit={() =>
                    carregarFamilia(
                      token,
                    )
                  }
                />

                <div className="mt-6 text-center">
                  <button
                    onClick={onClose}
                    className="
                      text-sm
                      text-[#F8EDEB]/70
                      hover:text-white
                      transition-colors
                    "
                  >
                    Voltar ao site
                  </button>
                </div>
              </>
            )}

            {errorMsg && (
              <div
                className="
                  mt-4
                  p-3
                  rounded-lg
                  border
                  border-red-500/30
                  bg-red-950/50
                  text-red-200
                  text-sm
                "
              >
                {errorMsg}
              </div>
            )}

            {familiaCarregada && (
              <>
                <GuestList
                  familia={
                    familiaCarregada
                  }
                  membrosConfirmados={
                    membrosConfirmados
                  }
                  naoIrei={
                    naoIrei
                  }
                  onToggle={
                    toggleMembro
                  }
                />

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    mb-6
                    p-4
                    rounded-xl
                    border
                    border-[#DE9B72]/20
                    bg-black/20
                  "
                >
                  <input
                    id="naoIrei"
                    type="checkbox"
                    checked={
                      naoIrei
                    }
                    onChange={(
                      e,
                    ) => {
                      const checked =
                        e.target.checked;

                      setNaoIrei(
                        checked,
                      );

                      if (
                        checked
                      ) {
                        setMembrosConfirmados(
                          [],
                        );
                      }
                    }}
                    className="
                      w-5
                      h-5
                      accent-[#DE9B72]
                    "
                  />

                  <label
                    htmlFor="naoIrei"
                    className="
                      text-[#F8EDEB]
                      cursor-pointer
                    "
                  >
                    Infelizmente não
                    poderemos comparecer
                  </label>
                </div>

                <ActionButtons
                  loading={
                    loading
                  }
                  naoIrei={
                    naoIrei
                  }
                  disabled={
                    !naoIrei &&
                    membrosConfirmados.length ===
                      0
                  }
                  onConfirm={
                    handleSalvar
                  }
                  onReset={() => {
                    setToken(
                      "",
                    );

                    setFamiliaCarregada(
                      null,
                    );

                    setNaoIrei(
                      false,
                    );

                    setMembrosConfirmados(
                      [],
                    );
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
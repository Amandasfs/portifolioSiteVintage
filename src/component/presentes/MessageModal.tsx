interface ReservaPendente {
  id: string;
  tipo: "compra" | "pix" | "skip";
  valor: number;
  nome: string;
}

interface MessageModalProps {
  reservaPendente: ReservaPendente;

  mensagemConvidado: string;
  nomeConvidado: string;

  salvando: boolean;

  onMensagemChange: (
    value: string,
  ) => void;

  onNomeChange: (
    value: string,
  ) => void;

  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function MessageModal({
  reservaPendente,

  mensagemConvidado,
  nomeConvidado,

  salvando,

  onMensagemChange,
  onNomeChange,

  onCancelar,
  onConfirmar,
}: MessageModalProps) {
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
          max-w-2xl
          overflow-hidden
          rounded-[28px]
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      >
        {/* Moldura */}

        <div
          className="
            absolute
            inset-0
            rounded-[28px]
            pointer-events-none
          "
          style={{
            border:
              "2px solid #DE9B72",
          }}
        />

        {/* Papel */}

        <div
          className="
            relative
            p-8
            md:p-10
          "
          style={{
            backgroundColor:
              "#f5deb3",

            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        >
          {/* Mancha envelhecida */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-40
            "
            style={{
              background: `
                radial-gradient(
                  circle at top left,
                  rgba(75,34,4,.12),
                  transparent 30%
                ),
                radial-gradient(
                  circle at bottom right,
                  rgba(75,34,4,.12),
                  transparent 40%
                )
              `,
            }}
          />

          <div className="relative z-10">
            {/* Cabeçalho */}

            <div className="text-center mb-8">
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-4
                  mb-4
                "
              >
                <div className="h-px w-16 bg-[#DE9B72]" />

                <span className="text-[#DE9B72]">
                  ❦
                </span>

                <div className="h-px w-16 bg-[#DE9B72]" />
              </div>

              <h2
                className="
                  font-romantic
                  text-5xl
                  text-highlight3
                "
              >
                Uma Mensagem
              </h2>

              <p
                className="
                  mt-3
                  text-highlight3/80
                "
              >
                {reservaPendente.tipo ===
                "skip"
                  ? "Ficamos felizes com sua presença."
                  : (
                      <>
                        Você escolheu:
                        <br />

                        <strong>
                          {
                            reservaPendente.nome
                          }
                        </strong>
                      </>
                    )}
              </p>
            </div>

            {/* Mensagem */}

            <div className="mb-6">
              <label
                className="
                  block
                  mb-2
                  text-highlight3
                  font-semibold
                "
              >
                Sua mensagem aos noivos
              </label>

              <textarea
                value={
                  mensagemConvidado
                }
                onChange={(e) =>
                  onMensagemChange(
                    e.target.value,
                  )
                }
                placeholder="Escreva aqui uma mensagem especial..."
                className="
                  w-full
                  h-40
                  resize-none

                  rounded-2xl

                  border-2
                  border-[#DE9B72]/50

                  bg-white/50

                  p-4

                  text-highlight3

                  focus:outline-none
                  focus:border-[#DE9B72]
                "
              />
            </div>

            {/* Nome */}

            <div className="mb-8">
              <label
                className="
                  block
                  mb-2
                  text-highlight3
                  font-semibold
                "
              >
                Assinatura (Opcional)
              </label>

              <input
                type="text"
                value={nomeConvidado}
                onChange={(e) =>
                  onNomeChange(
                    e.target.value,
                  )
                }
                placeholder="Seu nome"
                className="
                  w-full

                  rounded-2xl

                  border-2
                  border-[#DE9B72]/50

                  bg-white/50

                  p-4

                  text-highlight3

                  focus:outline-none
                  focus:border-[#DE9B72]
                "
              />
            </div>

            {/* Assinatura visual */}

            <div className="mb-8 text-center">
              <p
                className="
                  font-romantic
                  text-3xl
                  text-highlight3
                "
              >
                Com carinho,
              </p>

              <p
                className="
                  font-romantic
                  text-4xl
                  text-highlight3
                "
              >
                Milene & Gabriel
              </p>
            </div>

            {/* Botões */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-4
              "
            >
              <button
                onClick={onCancelar}
                disabled={salvando}
                className="
                  px-6
                  py-3

                  rounded-xl

                  border-2
                  border-[#DE9B72]

                  text-highlight3

                  hover:bg-[#DE9B72]/20

                  transition
                "
              >
                Voltar
              </button>

              <button
                onClick={onConfirmar}
                disabled={salvando}
                className="
                  px-8
                  py-3

                  rounded-xl

                  bg-details

                  text-background

                  border-2
                  border-[#DE9B72]

                  hover:brightness-110

                  transition
                "
              >
                {salvando
                  ? "Salvando..."
                  : reservaPendente.tipo ===
                    "pix"
                  ? "Gerar PIX"
                  : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
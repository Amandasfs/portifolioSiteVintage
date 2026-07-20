import pixNoivos from "../../assets/img/pixnoivos.jpeg";

interface PixModalProps {
  nomePresente: string;

  onClose: () => void;
  onSuccess: () => void;
}

export default function PixModal({
  nomePresente,
  onClose,
  onSuccess,
}: PixModalProps) {
  const codigoPix =
    "00020126580014BR.GOV.BCB.PIX013630432049-4afc-4d59-a3cf-799b9f6db7e15204000053039865802BR5925Milene Monteiro de Moraes6009SAO PAULO62140510ARNgXpoC016304E48D";

  const copiarPix = async () => {
    await navigator.clipboard.writeText(
      codigoPix,
    );

    alert(
      "Código PIX copiado para a área de transferência.",
    );
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

        bg-black/80
        backdrop-blur-md
      "
    >
      <div
        className="
          relative

          w-full
          max-w-xl

          max-h-[95vh]
          overflow-y-auto

          rounded-3xl

          shadow-[0_25px_80px_rgba(0,0,0,.55)]
        "
      >
        {/* Moldura */}

        <div
          className="
            absolute
            inset-0
            rounded-3xl
            pointer-events-none
          "
          style={{
            border: "2px solid #DE9B72",
          }}
        />

        {/* Fundo */}

        <div
          className="
            relative

            p-5
            sm:p-7
            md:p-10
          "
          style={{
            backgroundColor: "#f5deb3",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        >
          {/* Mancha de papel */}

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
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-10 sm:w-16 bg-[#DE9B72]" />
                <span className="text-[#DE9B72] text-lg">
                  𓆩♡𓆪
                </span>
                <div className="h-px w-10 sm:w-16 bg-[#DE9B72]" />
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl

                  font-bold
                  text-highlight3
                "
              >
                Presente via PIX
              </h2>

              <p
                className="
                  mt-4

                  text-sm
                  sm:text-base

                  text-highlight3/80
                "
              >
                Sua contribuição será uma
                lembrança especial para nós.
              </p>
            </div>

            {/* Presente */}

            <div className="text-center mb-8">
              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-highlight
                "
              >
                Presente Selecionado
              </span>

              <h3
                className="
                  mt-2

                  text-xl
                  sm:text-2xl

                  font-semibold
                  text-highlight3

                  break-words
                "
              >
                {nomePresente}
              </h3>
            </div>

            {/* QR Code */}

            <div className="flex justify-center mb-8">
              <div
                className="
                  p-3
                  sm:p-4

                  rounded-[28px]

                  shadow-xl
                "
                style={{
                  background:
                    "linear-gradient(135deg,#f5deb3,#DE9B72)",
                }}
              >
                <div
                  className="
                    bg-white

                    p-3
                    sm:p-4

                    rounded-[22px]
                  "
                >
                  <img
                    src={pixNoivos}
                    alt="QR Code PIX"
                    className="
                      w-[180px]
                      h-[180px]

                      sm:w-[240px]
                      sm:h-[240px]

                      md:w-[280px]
                      md:h-[280px]

                      object-contain
                    "
                  />
                </div>
              </div>
            </div>

            {/* Informação */}

            <div
              className="
                mb-6

                rounded-2xl

                border
                border-[#DE9B72]/40

                bg-white/40

                p-5
              "
            >
              <p
                className="
                  text-center
                  text-highlight3
                  leading-7
                "
              >
                Escaneie o QR Code ou utilize o
                PIX Copia e Cola abaixo.
              </p>
            </div>

            {/* PIX Copia e Cola */}

            <div
              className="
                mb-8

                rounded-2xl

                border
                border-[#DE9B72]/40

                bg-white/50

                p-4
              "
            >
              <p
                className="
                  text-center

                  text-xs
                  uppercase

                  tracking-[0.2em]

                  text-highlight

                  mb-3
                "
              >
                PIX Copia e Cola
              </p>

              <div
                className="
                  rounded-xl

                  bg-white/70

                  border
                  border-[#DE9B72]/30

                  p-3

                  text-xs
                  text-highlight3

                  break-all
                  select-all

                  mb-4
                "
              >
                {codigoPix}
              </div>

              <button
                onClick={copiarPix}
                className="
                  w-full

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
                Copiar Código PIX
              </button>
            </div>

            {/* Assinatura */}

            <div className="text-center mb-8">
              <p
                className="
                  text-xl
                  sm:text-2xl

                  text-highlight3
                "
              >
                Com carinho,
              </p>

              <p
                className="
                  mt-1

                  text-2xl
                  sm:text-3xl

                  font-semibold

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

                gap-3

                justify-center
              "
            >
              <button
                onClick={onClose}
                className="
                  w-full
                  sm:w-auto

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
                Fechar
              </button>

              <button
                onClick={onSuccess}
                className="
                  w-full
                  sm:w-auto

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
                Concluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
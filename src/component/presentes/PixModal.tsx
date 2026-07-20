import pixNoivos from "../../assets/img/pixnoivos.jpeg";

interface PixModalProps {
  chave: string;
  nomePresente: string;

  onClose: () => void;
  onSuccess: () => void;
}

export default function PixModal({
  chave,
  nomePresente,
  onClose,
  onSuccess,
}: PixModalProps) {
  const copiarPix = async () => {
    await navigator.clipboard.writeText(chave);

    alert(
      "Chave PIX copiada para a área de transferência.",
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
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          md:rounded-[28px]
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      >
        {/* Moldura */}

        <div
          className="
            absolute
            inset-0
            rounded-2xl
            md:rounded-[28px]
            pointer-events-none
          "
          style={{
            border: "2px solid #DE9B72",
          }}
        />

        {/* Papel */}

        <div
          className="
            relative
            p-5
            sm:p-6
            md:p-8
            lg:p-10
          "
          style={{
            backgroundColor: "#f5deb3",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        >
          {/* Envelhecimento */}

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
                  gap-3
                  sm:gap-4
                  mb-4
                "
              >
                <div className="h-px w-8 sm:w-12 md:w-16 bg-[#DE9B72]" />

                <span className="text-[#DE9B72]">
                  𓆩♡𓆪
                </span>

                <div className="h-px w-8 sm:w-12 md:w-16 bg-[#DE9B72]" />
              </div>

              <h2
                className="
                  font-romantic
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  text-highlight3
                "
              >
                Presente via PIX
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  sm:text-base
                  text-highlight3/80
                  leading-6
                  sm:leading-7
                "
              >
                Sua contribuição será uma
                lembrança especial para nós.
              </p>
            </div>

            {/* Presente */}

            <div className="mb-8 text-center">
              <span
                className="
                  text-xs
                  sm:text-sm
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
                  md:text-3xl
                  font-romantic
                  text-highlight3
                  break-words
                  px-2
                "
              >
                {nomePresente}
              </h3>
            </div>

            {/* IMAGEM DO QR CODE */}

            <div className="flex justify-center mb-8">
              <div
                className="
                  p-3
                  sm:p-4
                  md:p-5
                  rounded-[24px]
                  md:rounded-[32px]
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
                    md:p-4
                    rounded-[18px]
                    md:rounded-[24px]
                  "
                >
                  <img
                    src={pixNoivos}
                    alt="QR Code PIX"
                    className="
                      w-[180px]
                      h-[180px]

                      sm:w-[220px]
                      sm:h-[220px]

                      md:w-[260px]
                      md:h-[260px]

                      object-contain
                      rounded-lg
                    "
                  />
                </div>
              </div>
            </div>

            {/* Chave PIX */}

            <div className="mb-6 text-center">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-highlight
                  mb-2
                "
              >
                Chave PIX
              </p>

              <p
                className="
                  text-highlight3
                  text-xs
                  sm:text-sm
                  font-medium
                  break-all
                  select-all
                  px-2
                "
              >
                {chave}
              </p>
            </div>

            {/* Informação */}

            <div
              className="
                mb-8
                p-4
                sm:p-5
                rounded-xl
                md:rounded-2xl
                border
                border-[#DE9B72]/40
                bg-white/30
              "
            >
              <p
                className="
                  text-center
                  text-highlight3
                  text-sm
                  sm:text-base
                  leading-6
                  sm:leading-7
                "
              >
                Escolha livremente o valor da sua contribuição.
              </p>
            </div>

            {/* Copiar PIX */}

            <div
              className="
                mb-8
                rounded-xl
                md:rounded-2xl
                border
                border-[#DE9B72]/40
                bg-white/40
                p-3
                sm:p-4
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
                Chave PIX
              </p>

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
                Copiar Chave PIX
              </button>
            </div>

            {/* Assinatura */}

            <div className="text-center mb-8">
              <p
                className="
                  font-romantic
                  text-2xl
                  sm:text-3xl
                  text-highlight3
                "
              >
                Com carinho,
              </p>

              <p
                className="
                  font-romantic
                  text-3xl
                  sm:text-4xl
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
                sm:gap-4
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
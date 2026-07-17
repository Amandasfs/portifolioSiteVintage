import { QRCodeSVG } from "qrcode.react";

interface PixModalProps {
  chave: string;
  nomePresente: string;
  payload: string;

  onClose: () => void;
  onSuccess: () => void;
}

export default function PixModal({
  chave,
  nomePresente,
  payload,
  onClose,
  onSuccess,
}: PixModalProps) {
  const copiarPix = async () => {
    await navigator.clipboard.writeText(
      payload,
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
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-xl
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
                  gap-4
                  mb-4
                "
              >
                <div className="h-px w-16 bg-[#DE9B72]" />

                <span className="text-[#DE9B72]">
                  𓆩♡𓆪
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
                Presente via PIX
              </h2>

              <p
                className="
                  mt-4
                  text-highlight3/80
                  leading-7
                "
              >
                Sua contribuição será uma
                lembrança especial para nós.
              </p>
            </div>

            {/* Presente */}

            <div
              className="
                mb-8
                text-center
              "
            >
              <span
                className="
                  text-sm
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
                  text-2xl
                  font-romantic
                  text-highlight3
                "
              >
                {nomePresente}
              </h3>
            </div>

            {/* QR CODE */}

            <div className="flex justify-center mb-8">
              <div
                className="
                  p-5
                  rounded-[32px]
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
                    p-4
                    rounded-[24px]
                  "
                >
                  <QRCodeSVG
                    value={payload}
                    size={230}
                    level="H"
                    marginSize={2}
                  />
                </div>
              </div>
            </div>

            {/* Chave PIX */}

            <div
              className="
                mb-6
                text-center
              "
            >
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
                  font-medium
                  break-all
                  select-all
                "
              >
                {chave}
              </p>
            </div>

            {/* Informação */}

            <div
              className="
                mb-8
                p-5
                rounded-2xl
                border
                border-[#DE9B72]/40
                bg-white/30
              "
            >
              <p
                className="
                  text-center
                  text-highlight3
                  leading-7
                "
              >
                Escolha livremente o valor
                da sua contribuição.
              </p>
            </div>

            {/* PIX COPIA E COLA */}

            <div
              className="
                mb-8
                rounded-2xl
                border
                border-[#DE9B72]/40
                bg-white/40
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

            <div
              className="
                text-center
                mb-8
              "
            >
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
                gap-4
                justify-center
              "
            >
              <button
                onClick={onClose}
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
                Fechar
              </button>

              <button
                onClick={onSuccess}
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
                Concluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
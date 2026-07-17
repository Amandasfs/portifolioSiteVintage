import type { GiftItem } from "../../types/guest";

interface PresenteCardProps {
  presente: GiftItem;
  disabled: boolean;
  onReservar: () => void;
  onReservarPix: () => void;
}

export default function PresenteCard({
  presente,
  disabled,
  onReservar,
  onReservarPix,
}: PresenteCardProps) {
  const reservado = presente.is_reserved;

  return (
    <article
      className={`
        relative
        overflow-hidden
        rounded-[28px]

        transition-all
        duration-500

        hover:-translate-y-2
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]

        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : ""
        }
      `}
      style={{
        backgroundColor: "#f5deb3",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        border: "2px solid #DE9B72",
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
              rgba(75,34,4,.10),
              transparent 30%
            ),

            radial-gradient(
              circle at bottom right,
              rgba(75,34,4,.10),
              transparent 40%
            )
          `,
        }}
      />

      {/* Moldura interna */}

      <div
        className="
          absolute
          inset-3
          rounded-[20px]
          pointer-events-none
        "
        style={{
          border:
            "1px solid rgba(222,155,114,.25)",
        }}
      />

      <div className="relative z-10 p-5">
        {/* FOTO */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            mb-5
          "
        >
          <img
            src={
              presente.image_url ||
              "https://via.placeholder.com/600x600"
            }
            alt={presente.title}
            className="
              w-full
              h-64
              object-cover

              transition-transform
              duration-700

              hover:scale-110
            "
          />

          {/* Tag reservado */}

          {reservado && (
            <div
              className="
                absolute
                top-3
                right-3

                px-3
                py-1

                rounded-full

                text-xs
                uppercase
                tracking-widest

                bg-highlight3
                text-white
              "
            >
              Reservado
            </div>
          )}
        </div>

        {/* TÍTULO */}

        <h3
          className="
            font-romantic
            text-4xl
            text-center
            text-highlight3
            leading-tight
          "
        >
          {presente.title}
        </h3>

        {/* VALOR */}

        <div className="mt-3 text-center">
          <span
            className="
              text-highlight
              text-xl
              font-semibold
            "
          >
            R$ {presente.suggested_value}
          </span>
        </div>

        {/* DESCRIÇÃO */}

        <div
          className="
            mt-5
            flex
            justify-center
          "
        >
          <div
            className="
              h-px
              w-20
              bg-[#DE9B72]
            "
          />
        </div>

        {/* BOTÕES */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
          "
        >
          <button
            onClick={onReservar}
            disabled={
              reservado || disabled
            }
            className={`
              py-3
              rounded-xl

              transition-all

              border-2

              ${
                reservado || disabled
                  ? `
                    bg-gray-200
                    border-gray-300
                    text-gray-500
                  `
                  : `
                    bg-details
                    border-[#DE9B72]
                    text-background

                    hover:brightness-110
                  `
              }
            `}
          >
            {reservado
              ? "Presente Reservado"
              : "Reservar Presente"}
          </button>

          <a
            href={
              presente.link || "#"
            }
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (
                !presente.link ||
                reservado ||
                disabled
              ) {
                e.preventDefault();
              }
            }}
            className={`
              py-3
              rounded-xl

              text-center

              border-2

              transition-all

              ${
                reservado || disabled
                  ? `
                    border-gray-300
                    text-gray-400
                    cursor-not-allowed
                  `
                  : `
                    border-highlight3
                    text-highlight3

                    hover:bg-highlight3
                    hover:text-white
                  `
              }
            `}
          >
            Ver na Loja
          </a>

          <button
            onClick={onReservarPix}
            disabled={disabled}
            className={`
              py-3
              rounded-xl

              border-2
              border-[#DE9B72]

              transition-all

              ${
                disabled
                  ? `
                    opacity-40
                    cursor-not-allowed
                  `
                  : `
                    text-highlight3

                    hover:bg-[#DE9B72]
                    hover:text-highlight3
                  `
              }
            `}
          >
            Presentear via PIX
          </button>
        </div>

        {/* Rodapé */}

        <div className="mt-6 text-center">
          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-highlight/70
            "
          >
            Com Amor
          </span>
        </div>
      </div>
    </article>
  );
}
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
        rounded-xl
        border
        border-[#C9A227]/70
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]
        transition-all
        duration-500

        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:border-[#C9A227] hover:shadow-[0_8px_30px_rgba(201,162,39,0.22)]"
        }
      `}
    >
      {/* FOTO */}
      <div className="relative overflow-hidden rounded-lg border border-[#C9A227]/50 mb-5">
        <img
          src={
            presente.image_url ||
            "https://via.placeholder.com/600x600"
          }
          alt={presente.title}
          className={`
            w-full
            h-64
            object-cover
            transition-all
            duration-700

            ${reservado ? "grayscale brightness-90" : ""}
          `}
        />

        {reservado && (
          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              -rotate-12
              px-5
              py-2
              border-2
              border-dashed
              border-red-800
              text-red-800
              font-bold
              uppercase
              tracking-widest
              bg-white/80
            "
          >
            Reservado
          </div>
        )}
      </div>

      {/* TÍTULO */}
      <h3
        className="
          text-center
          text-2xl
          md:text-3xl
          text-black
          font-normal
          tracking-wide
          leading-snug
        "
      >
        {presente.title}
      </h3>

      {/* VALOR */}
      <div className="mt-2 text-center text-lg text-black/70 font-normal">
        R$ {presente.suggested_value}
      </div>

      {/* SUBTÍTULO */}
      <div
        className="
          mt-1
          text-center
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-black/40
        "
      >
        Lista de Casamento
      </div>

      {/* DIVISOR */}
      <div className="mt-5 flex items-center justify-center gap-4 text-[#C9A227]/60">
        <div className="h-px w-10 bg-current" />

        <span className="text-xs tracking-widest select-none">
          𓆩♡𓆪
        </span>

        <div className="h-px w-10 bg-current" />
      </div>

      {/* BOTÕES */}
      <div
        className="
          mt-6
          flex
          flex-col
          gap-3
          text-xs
          uppercase
          tracking-[0.2em]
          font-medium
        "
      >
        {/* RESERVAR */}
        <button
          onClick={onReservar}
          disabled={reservado || disabled}
          className={`
            py-3.5
            rounded-lg
            border
            transition-all
            duration-300

            ${
              reservado || disabled
                ? "border-black/5 text-black/20 cursor-not-allowed"
                : "border-[#C9A227] text-black hover:bg-[#C9A227] hover:text-white"
            }
          `}
        >
          {reservado
            ? "Presente Reservado"
            : "Reservar Presente"}
        </button>

        {/* LOJA */}
        <a
          href={presente.link || "#"}
          target="_blank"
          rel="noreferrer"
          className={`
            py-3.5
            rounded-lg
            text-center
            border
            transition-all
            duration-300

            ${
              reservado || disabled
                ? "border-black/5 text-black/20 cursor-not-allowed"
                : "border-[#C9A227]/50 text-black/60 hover:border-[#C9A227] hover:text-black"
            }
          `}
        >
          Ver na Loja
        </a>

        {/* PIX */}
        <button
          onClick={onReservarPix}
          disabled={disabled}
          className={`
            py-3.5
            rounded-lg
            border
            transition-all
            duration-300

            ${
              disabled
                ? "border-black/5 text-black/20 cursor-not-allowed"
                : "border-[#C9A227]/50 text-black/60 hover:border-[#C9A227] hover:text-black"
            }
          `}
        >
          Presentear via PIX
        </button>
      </div>
    </article>
  );
}

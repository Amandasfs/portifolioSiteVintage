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
        border-black/10
        p-6
        transition-all
        duration-500

        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-black/20"}
      `}
    >
      {/* FOTO */}
      <div className="relative overflow-hidden rounded-lg border border-black/10 mb-5">
        <img
          src={presente.image_url || "https://via.placeholder.com/600x600"}
          alt={presente.title}
          className={`
            w-full h-64 object-cover transition-all duration-700
            ${reservado ? "grayscale brightness-90" : ""}
          `}
        />

        {reservado && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 px-5 py-2 border-2 border-dashed border-red-800 text-red-800 font-bold uppercase tracking-widest bg-white/80">
            Reservado
          </div>
        )}
      </div>

      {/* TÍTULO (Peso normal, sem bold) */}
      <h3 className="text-center text-2xl md:text-3xl text-black font-normal tracking-wide leading-snug">
        {presente.title}
      </h3>

      {/* VALOR */}
      <div className="mt-2 text-center text-lg text-black/70 font-normal">
        R$ {presente.suggested_value}
      </div>

      {/* SUBTÍTULO */}
      <div className="mt-1 text-center text-[10px] uppercase tracking-[0.3em] text-black/40">
        Lista de Casamento
      </div>

      {/* DIVISOR */}
      <div className="mt-5 flex items-center justify-center gap-4 text-black/20">
        <div className="h-px w-10 bg-current" />
        <span className="text-xs tracking-widest select-none">𓆩♡𓆪</span>
        <div className="h-px w-10 bg-current" />
      </div>

      {/* BOTÕES */}
      <div className="mt-6 flex flex-col gap-3 text-xs uppercase tracking-[0.2em] font-medium">
        {/* RESERVAR */}
        <button
          onClick={onReservar}
          disabled={reservado || disabled}
          className={`
            py-3.5 rounded-lg border transition-all duration-300
            ${reservado || disabled
              ? "border-black/5 text-black/20 cursor-not-allowed"
              : "border-black text-black hover:bg-black hover:text-white"
            }
          `}
        >
          {reservado ? "Presente Reservado" : "Reservar Presente"}
        </button>

        {/* LOJA */}
        <a
          href={presente.link || "#"}
          target="_blank"
          rel="noreferrer"
          className={`
            py-3.5 rounded-lg text-center border transition-all duration-300
            ${reservado || disabled
              ? "border-black/5 text-black/20 cursor-not-allowed"
              : "border-black/20 text-black/60 hover:border-black hover:text-black"
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
            py-3.5 rounded-lg border transition-all duration-300
            ${disabled
              ? "border-black/5 text-black/20 cursor-not-allowed"
              : "border-black/20 text-black/60 hover:border-black hover:text-black"
            }
          `}
        >
          Presentear via PIX
        </button>
      </div>
    </article>
  );
}
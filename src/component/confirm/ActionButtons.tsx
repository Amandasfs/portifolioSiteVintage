interface ActionButtonsProps {
  loading: boolean;
  naoIrei: boolean;
  disabled: boolean;
  onConfirm: () => void;
  onReset: () => void;
}

export default function ActionButtons({
  loading,
  naoIrei,
  disabled,
  onConfirm,
  onReset,
}: ActionButtonsProps) {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        gap-3
        justify-center
        items-center
      "
    >
      <button
        disabled={disabled}
        onClick={onConfirm}
        className="
          w-full
          sm:w-auto
          bg-gradient-to-r
          from-[#442D1C]
          to-[#5A3A24]
          text-[#F8EDEB]
          font-bold
          px-8
          py-3
          rounded-xl
          border-2
          border-[#DE9B72]/40
          disabled:opacity-50
          hover:scale-105
          transition-transform
          uppercase
          tracking-widest
          text-xs
          shadow-md
        "
      >
        {loading
          ? "Salvando..."
          : naoIrei
          ? "Confirmar Ausência"
          : "Confirmar Presença"}
      </button>

      <button
        onClick={onReset}
        className="
          text-xs
          text-[#F8EDEB]/70
          hover:text-white
          hover:underline
        "
      >
        Trocar código
      </button>
    </div>
  );
}
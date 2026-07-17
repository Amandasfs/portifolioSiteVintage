interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function GiftActions({
  disabled,
  onClick,
}: Props) {
  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={onClick}
        disabled={disabled}
        className="
          px-10
          py-4
          rounded-2xl
          bg-details
          text-background
          border-2
          border-[#DE9B72]
          hover:scale-105
          transition
        "
      >
        Apenas confirmar presença
      </button>
    </div>
  );
}
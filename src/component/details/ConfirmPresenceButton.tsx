interface ConfirmPresenceButtonProps {
  onClick: () => void;
}

export default function ConfirmPresenceButton({
  onClick,
}: ConfirmPresenceButtonProps) {
  return (
    <div
      className="
        w-full
        flex
        justify-center
        mt-6
        sm:mt-8
      "
    >
      <button
        onClick={onClick}
        type="button"
        className="
          w-full
          max-w-xs
          px-6
          sm:px-8
          py-3
          sm:py-4
          rounded-lg
          font-semibold
          text-white
          text-base
          sm:text-lg
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
        "
        style={{
          backgroundColor: "#4d6648",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/xv.png')",
          backgroundSize: "cover",
          border: "2px solid #DE9B72",
        }}
      >
        Confirmar Presença
      </button>
    </div>
  );
}
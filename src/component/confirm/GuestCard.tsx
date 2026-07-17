import type { Guest } from "../../types/guest";

interface GuestCardProps {
  guest: Guest;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export default function GuestCard({
  guest,
  checked,
  disabled,
  onToggle,
}: GuestCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      className="
        w-full
        flex
        items-center
        justify-between
        p-3
        rounded-lg
        border
        border-[#DE9B72]/30
        bg-[#3A5544]/60
        hover:bg-[#DE9B72]/20
        transition-colors
        disabled:opacity-50
      "
    >
      <span
        className="
          text-[#F8EDEB]
          font-medium
        "
      >
        {guest.name}
      </span>

      <div
        className={`
          w-6
          h-6
          rounded
          flex
          items-center
          justify-center
          border-2
          transition-all
          ${
            checked
              ? "bg-[#DE9B72] border-[#DE9B72]"
              : "border-[#DE9B72]/60"
          }
        `}
      >
        {checked && (
          <span
            className="
              text-[#3A5544]
              font-bold
              text-sm
            "
          >
            ✓
          </span>
        )}
      </div>
    </button>
  );
}
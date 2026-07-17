import type { GuestGroup } from "../../types/guest";

import GuestCard from "./GuestCard";

interface GuestListProps {
  familia: GuestGroup;
  membrosConfirmados: string[];
  naoIrei: boolean;
  onToggle: (id: string) => void;
}

export default function GuestList({
  familia,
  membrosConfirmados,
  naoIrei,
  onToggle,
}: GuestListProps) {
  return (
    <div
      className="
        mb-6
        p-4
        rounded-xl
        border-2
        border-[#DE9B72]/40
        bg-[#3A5544]/60
        shadow-inner
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-10
        "
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/project-paper.png')",
        }}
      />

      <div className="relative z-10">
        <h4
          className="
            text-xl
            font-romantic
            text-[#F8EDEB]
            mb-1
          "
        >
          Família
        </h4>

        <p
          className="
            text-2xl
            font-bold
            text-[#DE9B72]
            mb-4
          "
        >
          {familia.name}
        </p>

        <div
          className={`
            space-y-2
            max-h-56
            overflow-y-auto
            pr-2
            custom-scrollbar
            ${
              naoIrei
                ? "opacity-30 pointer-events-none"
                : ""
            }
          `}
        >
          {familia.guests.map(
            (guest) => (
              <GuestCard
                key={guest.id}
                guest={guest}
                checked={membrosConfirmados.includes(
                  guest.id
                )}
                disabled={naoIrei}
                onToggle={() =>
                  onToggle(guest.id)
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
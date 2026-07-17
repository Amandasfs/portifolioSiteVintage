import { CheckCircle2, Clock } from "lucide-react";
import type { Guest } from "../../types/guest";

interface GuestListTabProps {
  confirmados: Guest[];
  pendentes: Guest[];
}

export default function GuestListTab({ confirmados, pendentes }: GuestListTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-details"></div>
        <div className="flex items-center gap-3 mb-6 border-b border-[#DE9B72]/30 pb-4 ml-4">
          <CheckCircle2 className="text-details w-7 h-7" />
          <h2 className="text-2xl md:text-3xl font-romantic text-highlight3">Confirmados ({confirmados.length})</h2>
        </div>
        <div className="space-y-2 ml-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {confirmados.length === 0 ? (
            <p className="text-sm font-sans text-highlight3/60 italic">Nenhuma confirmação até o momento.</p>
          ) : confirmados.map(guest => (
            <div key={guest.id} className="flex justify-between items-center bg-[#f5deb3]/40 border border-[#DE9B72]/30 p-3 rounded-lg shadow-sm">
              <span className="font-sans font-bold text-highlight3 text-sm truncate">{guest.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-details bg-details/10 px-2 py-1 rounded ml-2">{guest.groupName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border-2 border-[#DE9B72]/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-highlight"></div>
        <div className="flex items-center gap-3 mb-6 border-b border-[#DE9B72]/30 pb-4 ml-4">
          <Clock className="text-highlight w-7 h-7" />
          <h2 className="text-2xl md:text-3xl font-romantic text-highlight3">Pendentes ({pendentes.length})</h2>
        </div>
        <div className="space-y-2 ml-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {pendentes.length === 0 ? (
            <p className="text-sm font-sans text-highlight3/60 italic">Nenhum convidado pendente.</p>
          ) : pendentes.map(guest => (
            <div key={guest.id} className="flex justify-between items-center bg-white border border-[#DE9B72]/30 p-3 rounded-lg shadow-sm opacity-80">
              <span className="font-sans font-bold text-highlight3 text-sm truncate">{guest.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-highlight bg-highlight/10 px-2 py-1 rounded ml-2">{guest.groupName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import cornerImage from "../assets/img/cornerImage.png";

export default function ConfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="relative w-96 rounded-2xl p-8 shadow-2xl text-center border-2 border-[#DE9B72] overflow-hidden"
        style={{
          backgroundColor: "#4d6648ff",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/xv.png')",
        }}
      >
        {/* ===== Cantos Decorativos ===== */}
        <img
          src={cornerImage}
          className="absolute top-0 left-0 w-16 h-16"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute top-0 right-0 w-16 h-16 scale-x-[-1]"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute bottom-0 right-0 w-16 h-16 scale-[-1]"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute bottom-0 left-0 w-16 h-16 scale-y-[-1]"
          alt="corner"
        />

        {/* ===== Conteúdo ===== */}
        <div className="relative z-10 text-[#f9e4b7]">
          <h3 className="text-3xl font-romantic text-background mb-6 tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Confirmar Presença
          </h3>

          <input
            type="text"
            placeholder="Token do convite"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded-lg bg-transparent border border-[#2e170eff] text-[#f5deb3] placeholder-[#2e170eff]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72]"
          />
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full mb-6 px-3 py-2 rounded-lg bg-transparent border border-[#2e170eff] text-[#f5deb3] placeholder-[#2e170eff]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72]"
          />

          <div className="flex gap-3 justify-center">
            <button className="bg-[#442D1C] text-[#f5deb3] font-semibold px-5 py-2 rounded-lg hover:bg-[#2e170eff] transition-all">
              Enviar
            </button>
            <button
              onClick={onClose}
              className="bg-[#f9e4b7]/20 text-[#f9e4b7] px-5 py-2 rounded-lg hover:bg-[#f9e4b7]/30 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

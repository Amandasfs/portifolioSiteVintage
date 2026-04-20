import { useState } from "react";
import selo from "../assets/img/carimbo.svg";

interface Props {
  mensagemPrincipal?: string;
  citaBiblica?: string;
}

export default function MensagemSucessoModal({
  mensagemPrincipal = "Presença confirmada com sucesso! Te esperamos lá",
  citaBiblica = `"Ninguém jamais viu a Deus; se nos amarmos uns aos outros, Deus permanece em nós, e o seu amor é aperfeiçoado em nós." 1 João 4:12`,
}: Props) {
  const [aberto, setAberto] = useState(true);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      <div
        className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl animate-fadeIn border-[3px]"
        style={{
          borderColor: "rgba(132, 89, 43, 0.9)",
          background: `
            radial-gradient(
              circle at center,
              rgba(204, 194, 169, 0.96) 0%,
              rgba(199, 178, 156, 1) 35%,
              rgba(170, 133, 93, 1) 70%,
              rgba(105, 77, 45, 1) 100%
            )
          `,
          backgroundBlendMode: "overlay",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          backgroundSize: "400px 400px",
          boxShadow: "0 10px 30px rgba(70, 40, 10, 0.3)",
        }}
      >
        {/* Botão de fechar */}
        <button
          onClick={() => setAberto(false)}
          className="absolute top-2 right-3 sm:top-3 sm:right-4 text-[#2e170eff] hover:text-[#b38b59] text-2xl sm:text-3xl font-light"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Cabeçalho: selo + mensagem */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <img
              src={selo}
              alt="Selo do casal"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
            />
            <h2 className="text-xl sm:text-3xl md:text-4xl font-romantic text-[#2e170eff] leading-snug max-w-[220px] sm:max-w-[260px]">
              {mensagemPrincipal}
            </h2>
          </div>

          {/* Citação bíblica */}
          <p className="text-[#2e170eff] text-sm sm:text-base md:text-lg font-serif italic leading-relaxed px-2 sm:px-4">
            {citaBiblica}
          </p>
        </div>
      </div>

      {/* Animação */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

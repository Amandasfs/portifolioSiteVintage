import { useState, useEffect } from "react";
import molduraImage from "../../assets/img/moldura.png";
import ConfirmModal from "../../component/ConfirmModal";

export default function DetailsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weddingDate = new Date("2027-08-29T18:00:00");

  const calculateCountdown = () => {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());
  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculateCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const Calendar = () => {
    const monthDays = [];
    const weddingDay = 29;
    for (let i = 1; i <= 31; i++) monthDays.push(i);

    return (
      <div
  className="mt-6 p-4 rounded-lg border border-highlight3 border-opacity-20 max-w-md mx-auto"
  style={{
    backgroundColor: "#fffcfa23",
    backgroundSize: "cover",
    border: "2px solid #fffcfa23",
  }}
>
  <h4 className="text-4xl font-romantic mb-3 text-center text-highlight3">
    Agosto 2027
  </h4>

  <div className="grid grid-cols-7 gap-1 text-center">
    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
      <div
        key={d}
        className="font-semibold text-xs text-highlight3 flex justify-center items-center aspect-square"
      >
        {d}
      </div>
    ))}

    {monthDays.map((d) => (
      <div
        key={d}
        className={`flex justify-center items-center rounded transition-all duration-300 text-xs aspect-square min-w-[40px] min-h-[40px] ${
          d === weddingDay
            ? "bg-highlight3 text-white transform scale-105 shadow"
            : "bg-white bg-opacity-10 hover:bg-opacity-20 text-highlight3"
        }`}
      >
        {d === weddingDay ? (
          <div className="flex flex-col items-center">
            <span className="text-xs">❤</span>
            <span className="font-bold">{d}</span>
          </div>
        ) : (
          d
        )}
      </div>
    ))}
  </div>

  <p className="mt-2 text-center text-xs opacity-80 text-highlight3">
    <span className="text-highlight3 mr-1">❤</span> Nosso grande dia!
  </p>
</div>
    );
  };
  // Background de papel antigo melhorado
  const paperBackground = {
    backgroundColor: "#30190541",
    backgroundImage: `
      url('https://www.transparenttextures.com/patterns/snow.png'),
      linear-gradient(to bottom, #4d6648b6, #eec881d3)
    `,
    backgroundBlendMode: "multiply",
    backgroundSize: "cover, cover",
    position: "relative" as const,
  };
  return (
    <>
      <section
        className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-8 relative overflow-hidden"
        style={paperBackground}
      >
        {/* Velas nos cantos inferiores com efeito de iluminação */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="relative">
            {/* Efeito de luz da vela esquerda */}
            <div 
              className="absolute -top-8 -left-4 w-24 h-24 rounded-full opacity-30 blur-xl animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 30%, transparent 70%)',
                animation: 'flicker 3s infinite alternate'
              }}
            ></div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <div className="relative">
            {/* Efeito de luz da vela direita */}
            <div 
              className="absolute -top-8 -right-4 w-24 h-24 rounded-full opacity-30 blur-xl animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 30%, transparent 70%)',
                animation: 'flicker 3s infinite alternate 1.5s'
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative z-20">
          {/* -------------------- LADO ESQUERDO -------------------- */}
          <div className="flex flex-col items-center lg:w-1/2 w-full space-y-6">
            {/* Moldura sem efeitos */}
            <div className="relative w-full max-w-xs mx-auto flex justify-center">
              <img
                src={molduraImage}
                alt="Nossa moldura"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Plaquinha menor */}
            <div
              className="relative rounded px-2 py-3 text-center w-64 max-w-xs mx-auto"
              style={{
                background:
                  "linear-gradient(145deg, #e1e1e1 0%, #f2f2f2 30%, #bcbcbc 70%, #9a9a9a 100%)",
                border: "2px solid #8d8c8cff",
              }}
            >
              {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-2 h-2 bg-gradient-to-br from-gray-200 to-gray-600 rounded-full border border-gray-700`}
                  ></div>
                )
              )}

              <h4 className="text-lg font-texts text-[#2E170E] font-bold">
                Milene & Gabriel
              </h4>
              <p className="italic text-[#442D1C] text-xs">Amor Verdadeiro</p>
              <p className="text-xs text-[#2E170E] opacity-90 border-t border-[#2E170E]/30 pt-1 mt-1">
                Desde dia de mes de ano
              </p>
            </div>

            {/* Contador Regressivo menor */}
            <div className="text-center w-full">
              <h3 className="text-3xl font-romantic text-highlight3 mb-4">
                Contagem Regressiva
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {[
                  { value: countdown.days, label: "Dias" },
                  { value: countdown.hours, label: "Horas" },
                  { value: countdown.minutes, label: "Minutos" },
                  { value: countdown.seconds, label: "Segundos" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-#fffcfa23 rounded p-3 min-w-[70px] border border-#fffcfa23"
                  >
                    <div className="text-xl font-bold text-#fffcfa23">
                      {item.value}
                    </div>
                    <div className="text-xs text-#fffcfa23 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -------------------- LADO DIREITO -------------------- */}
          <div className="lg:w-1/2 w-full flex flex-col items-center">
            <h2 className="text-5xl font-romantic mb-6 text-highlight3 text-center">
              Nossa História
            </h2>

            {/* Texto centralizado */}
            <div className="space-y-4 text-base leading-relaxed text-highlight3 mb-6 text-center max-w-md">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.
              </p>
              <p className="italic text-4xl font-romantic text-highlight3 mt-4">
                "O verdadeiro amor não é algo que se encontra, mas algo que se constrói."
              </p>
            </div>

            {/* Calendário menor */}
            <div className="w-full">
              <Calendar />
            </div>

            {/* Botão Confirmar Presença */}
            <div className="w-full flex justify-center mt-6">
              <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 font-semibold rounded-lg shadow-lg text-white text-base transition-all transform hover:scale-105"
              style={{
                backgroundColor: "#4d6648ff",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/xv.png')",
                backgroundSize: "cover", // garante que o padrão cubra todo o botão
                border: "2px solid #DE9B72", // opcional, se quiser a borda vintage
              }}
            >
              Confirmar Presença
            </button>

            </div>
          </div>
        </div>

        {/* Estilos para animação de flicker */}
        <style>{`
          @keyframes flicker {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(1);
            }
            25% { 
              opacity: 0.4;
              transform: scale(1.05);
            }
            50% { 
              opacity: 0.25;
              transform: scale(0.95);
            }
            75% { 
              opacity: 0.35;
              transform: scale(1.02);
            }
          }
        `}</style>

      </section>

      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
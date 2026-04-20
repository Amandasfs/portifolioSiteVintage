import c1 from "../../assets/img/c1.jpeg";
import c2 from "../../assets/img/c2.jpeg";
import c3 from "../../assets/img/c3.jpeg";

export default function BackgroundCarousel() {
  const imagensCarrossel = [c1, c2, c3];

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center h-[20rem] md:h-[20rem] lg:h-[20rem]">
      {/* Faixa de imagens animada */}
      <div
        className="flex animate-scroll-horizontal"
        style={{ width: "max-content" }}
      >
        {imagensCarrossel.concat(imagensCarrossel).map((url, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[12rem] h-[12rem] sm:w-[15rem] sm:h-[15rem] md:w-[18rem] md:h-[18rem] mx-4 relative"
          >
            {/* Moldura marrom vintage */}
            <div className="absolute inset-0 rounded-2xl border-[8px] border-[#5b3a29] shadow-md"></div>

            {/* Imagem com filtro vintage */}
            <div
              className="w-full h-full bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: `url(${url})`,
                filter:
                  "sepia(0.4) contrast(1.1) brightness(0.95) saturate(0.9)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Estilo da animação */}
      <style>{`
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 50s linear infinite;
        }
      `}</style>
    </div>
  );
}

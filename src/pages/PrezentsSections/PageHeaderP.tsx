import BackgroundCarousel from "./BackgroundCarousel";
import cornerImage from "../../assets/img/cornerImage2.svg";

export default function PageHeaderP() {
  return (
    <header
      className="relative w-full overflow-hidden flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundColor: "#4d6648ff",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/xv.png')",
      }}
    >
      {/* ==== Cantos decorativos ==== */}
      <CornerDecorations />

      {/* ==== Decorações verticais (topo e base) ==== */}
      <img
        src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-44 lg:w-56"
        alt="top decoration"
      />
      <img
        src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-44 lg:w-56 scale-y-[-1]"
        alt="bottom decoration"
      />

      {/* ==== Carrossel de fundo com texto ==== */}
      <div className="relative z-0 w-full flex justify-center items-center py-12 sm:py-16 md:py-20 lg:py-24 min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[24rem]">
        <div className="relative w-[92%] sm:w-[85%] md:w-[80%] lg:w-[90%]">
          {/* Carrossel */}
          <BackgroundCarousel />

          {/* Texto sobreposto */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-8">
            {/* ==== Card translúcido com borda dourada ==== */}
            <div className="bg-highlight/15 border border-highlight3 rounded-2xl shadow-lg backdrop-blur-sm px-6 py-6 sm:px-10 sm:py-8 md:px-12 md:py-10 max-w-[90%] sm:max-w-[90%] md:max-w-[90%]">
              
              {/* ==== Título dourado animado ==== */}
              <h1
                className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-romantic text-background mb-4"
              >
                Obrigada por confirmar sua presença!
              </h1>

              {/* ==== Texto highlight ==== */}
              <p className="text-base sm:text-lg md:text-xl lg:text-1xl font-light text-background">
                Se quiser nos presentear, aqui está nossa lista com sugestões de presentes.
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

/* --- Cantos decorativos --- */
function CornerDecorations() {
  return (
    <>
      {/* Superior esquerdo */}
      <img
        src={cornerImage}
        alt="decor corner"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 w-10 sm:w-24 md:w-32 rotate-90"
      />

      {/* Superior direito */}
      <img
        src={cornerImage}
        alt="decor corner"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-10 sm:w-24 md:w-32 rotate-180"
      />

      {/* Inferior esquerdo */}
      <img
        src={cornerImage}
        alt="decor corner"
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 w-10 sm:w-24 md:w-32"
      />

      {/* Inferior direito */}
      <img
        src={cornerImage}
        alt="decor corner"
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-10 sm:w-24 md:w-32 -rotate-90"
      />
    </>
  );
}

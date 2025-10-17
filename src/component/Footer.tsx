import cornerImage from "../assets/img/cornerImage.png";

export default function Footer() {
  return (
    <footer
      className="
        relative w-full text-center overflow-hidden
        border-t-2 border-[#DE9B72]
      "
      style={{
        backgroundColor: "#4d6648ff",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/xv.png')",
      }}
    >
      {/* ===== Cantos Decorativos ===== */}
      <img
        src={cornerImage}
        className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24"
        alt="corner"
      />
      <img
        src={cornerImage}
        className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 scale-x-[-1]"
        alt="corner"
      />
      <img
        src={cornerImage}
        className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 scale-[-1]"
        alt="corner"
      />
      <img
        src={cornerImage}
        className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 scale-y-[-1]"
        alt="corner"
      />

      {/* ===== Conteúdo ===== */}
      <div className="relative z-10 py-6 md:py-8">
        <p
          className="
            text-[2rem] md:text-[2rem] 
            font-romantic 
           text-background
          "
        >
          Att. Milene & Gabriel
        </p>
      </div>
    </footer>
  );
}

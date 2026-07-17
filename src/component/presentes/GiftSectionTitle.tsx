export default function GiftSectionTitle() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-20 bg-[#DE9B72]/50" />
        <span className="text-[#DE9B72] text-xl">𓆩♡𓆪</span>
        <div className="h-px w-20 bg-[#DE9B72]/50" />
      </div>

      <h2
        className="
          font-romantic
          text-5xl
          md:text-6xl
          text-highlight3
        "
      >
        Lista de Presentes
      </h2>

      <p
        className="
          mt-4
          text-highlight3/80
          text-lg
        "
      >
        Cada presente representa um pedaço
        do nosso novo lar.
      </p>
    </div>
  );
}
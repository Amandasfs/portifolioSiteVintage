export default function CouplePlate() {
  const screwPositions = [
    "top-1 left-1",
    "top-1 right-1",
    "bottom-1 left-1",
    "bottom-1 right-1",
  ];

  return (
    <div
      className="
        relative
        w-full
        max-w-[280px]
        sm:max-w-xs
        mx-auto
        rounded
        px-3
        py-3
        text-center
      "
      style={{
        background:
          "linear-gradient(145deg, #e1e1e1 0%, #f2f2f2 30%, #bcbcbc 70%, #9a9a9a 100%)",
        border: "2px solid #8d8c8c",
      }}
    >
      {screwPositions.map((position, index) => (
        <div
          key={index}
          className={`
            absolute
            ${position}
            w-2
            h-2
            rounded-full
            border
            border-gray-700
            bg-gradient-to-br
            from-gray-200
            to-gray-600
          `}
        />
      ))}

      <h4
        className="
          text-base
          sm:text-lg
          font-bold
          font-texts
          text-[#2E170E]
        "
      >
        Milene & Gabriel
      </h4>

      <p
        className="
          italic
          text-xs
          sm:text-sm
          text-[#442D1C]
        "
      >
        Amor Verdadeiro
      </p>

      <p
        className="
          mt-1
          pt-1
          text-xs
          opacity-90
          border-t
          border-[#2E170E]/30
          text-[#2E170E]
        "
      >
        Desde 25 . janeiro . 2023
      </p>
    </div>
  );
}
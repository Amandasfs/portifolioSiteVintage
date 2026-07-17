function CandleGlow({
  side,
}: {
  side: "left" | "right";
}) {
  const positionClass =
    side === "left"
      ? "absolute bottom-2 left-2 sm:bottom-4 sm:left-4"
      : "absolute bottom-2 right-2 sm:bottom-4 sm:right-4";

  const glowClass =
    side === "left"
      ? "-top-8 -left-4"
      : "-top-8 -right-4";

  const animation =
    side === "left"
      ? "flicker 3s infinite alternate"
      : "flicker 3s infinite alternate 1.5s";

  return (
    <div className={`${positionClass} z-10`}>
      <div className="relative">
        <div
          className={`
            absolute
            ${glowClass}
            w-20
            h-20
            sm:w-24
            sm:h-24
            rounded-full
            opacity-30
            blur-xl
          `}
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 30%, transparent 70%)",
            animation,
          }}
        />
      </div>
    </div>
  );
}

export default function CandleLights() {
  return (
    <>
      <CandleGlow side="left" />
      <CandleGlow side="right" />
    </>
  );
}
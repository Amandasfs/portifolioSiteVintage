export default function WeddingCalendar() {
  const weddingDay = 29;

  const monthDays = Array.from(
    { length: 31 },
    (_, index) => index + 1,
  );

  const weekDays = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
  ];

  return (
    <section
      className="
        w-full
        max-w-md
        mt-6
      "
    >
      <div
        className="
          rounded-xl
          p-3
          sm:p-4
        "
        style={{
          backgroundColor: "#fffcfa23",
          border: "2px solid #fffcfa23",
        }}
      >
        <h4
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-romantic
            text-center
            text-highlight3
            mb-4
          "
        >
          Agosto 2027
        </h4>

        <div
          className="
            grid
            grid-cols-7
            gap-[2px]
            sm:gap-1
            text-center
          "
        >
          {weekDays.map((day) => (
            <div
              key={day}
              className="
                aspect-square
                flex
                items-center
                justify-center
                text-[10px]
                sm:text-xs
                font-semibold
                text-highlight3
              "
            >
              {day}
            </div>
          ))}

          {monthDays.map((day) => (
            <div
              key={day}
              className={`
                aspect-square
                min-h-[30px]
                sm:min-h-[40px]
                rounded
                flex
                items-center
                justify-center
                transition-all
                duration-300
                text-[10px]
                sm:text-xs
                ${
                  day === weddingDay
                    ? "bg-highlight3 text-white scale-105 shadow"
                    : "bg-white/10 text-highlight3 hover:bg-white/20"
                }
              `}
            >
              {day === weddingDay ? (
                <div className="flex flex-col items-center">
                  <span className="text-[10px]">❤</span>
                  <span className="font-bold">{day}</span>
                </div>
              ) : (
                day
              )}
            </div>
          ))}
        </div>

        <p
          className="
            mt-3
            text-center
            text-[10px]
            sm:text-xs
            text-highlight3
            opacity-80
          "
        >
          ❤ Nosso grande dia!
        </p>
      </div>
    </section>
  );
}
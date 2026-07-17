import CountdownCard from "./CountdownCard";
import { useCountdown } from "../../hooks/useCountdown";

export default function CountdownSection() {
  const countdown = useCountdown();

  const items = [
    {
      value: countdown.days,
      label: "Dias",
    },
    {
      value: countdown.hours,
      label: "Horas",
    },
    {
      value: countdown.minutes,
      label: "Minutos",
    },
    {
      value: countdown.seconds,
      label: "Segundos",
    },
  ];

  return (
    <section
      className="
        w-full
        max-w-xl
        text-center
      "
    >
      <h3
        className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-romantic
          text-highlight3
          mb-4
        "
      >
        Contagem Regressiva
      </h3>

     <div
        className="
          w-full

          flex
          flex-wrap

          justify-center
          items-center

          gap-3
          sm:gap-4

          mx-auto
        "
      >
        {items.map((item) => (
          <CountdownCard
            key={item.label}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>
    </section>
  );
}
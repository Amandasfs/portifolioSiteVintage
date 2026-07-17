import type { CountdownCardProps } from "../../types/countdown";

export default function CountdownCard({
  value,
  label,
}: CountdownCardProps) {
  return (
    <div
      className="
        w-[80px]
        sm:w-[90px]
        md:w-[100px]

        rounded-lg
        p-3
        sm:p-4

        border
        text-center

        flex
        flex-col
        items-center
        justify-center

        shadow-lg
      "
      style={{
        backgroundColor: "#fffcfa23",
        borderColor: "#fffcfa35",
      }}
    >
      <div
        className="
          text-xl
          sm:text-2xl
          md:text-3xl
          font-bold
        "
        style={{
          color: "#fffcfa",
        }}
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-[10px]
          sm:text-xs
          uppercase
          tracking-wider
        "
        style={{
          color: "#fffcfa",
        }}
      >
        {label}
      </div>
    </div>
  );
}
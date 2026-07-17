import molduraImage from "../../assets/img/moldura.png";

export default function CoupleFrame() {
  return (
    <div
      className="
        relative
        w-full
        max-w-[280px]
        sm:max-w-sm
        md:max-w-md
        lg:max-w-lg
        xl:max-w-xl
        mx-auto
        flex
        justify-center
      "
    >
      <img
        src={molduraImage}
        alt="Moldura do casal"
        className="
          w-full
          h-auto
          object-contain
          select-none
        "
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
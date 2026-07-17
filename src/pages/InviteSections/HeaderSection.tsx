import VintageBorder from "../../component/modal/VintageBorder";

export default function HeaderSection() {
  return (
    <VintageBorder>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center text-[#f9e4b7]">
        <h1
          className="
            font-romantic
            mb-4 sm:mb-6
            text-3xl
            xs:text-4xl
            sm:text-5xl
            md:text-6xl
            tracking-[0.15rem]
            sm:tracking-[0.3rem]
            md:tracking-[0.5rem]
            leading-tight
            break-words
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
          "
        >
          Milene & Gabriel
        </h1>

        <p
          className="
            mb-4
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            font-semibold
            leading-relaxed
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
          "
        >
          Convidam para celebrar o amor e a união.
        </p>

        <p
          className="
            mb-6 sm:mb-8
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            italic
            leading-relaxed
            max-w-3xl
            mx-auto
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
          "
        >
          Acima de tudo isto, porém, esteja o amor, que é o vínculo da
          perfeição.
        </p>

        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            italic
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
          "
        >
          Colossenses 3:14
        </p>
      </div>
    </VintageBorder>
  );
}
import VintageBorder from "../../component/VintageBorder";

export default function HeaderSection() {
  return (
    <VintageBorder>
      <div className="text-center text-[#f9e4b7] px-6">
        <h1 className="text-5xl md:text-6xl font-romantic mb-6 tracking-[0.8rem] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Milene & Gabriel
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Convidam para celebrar o amor e a união.
        </p>
        <p className="text-xl italic mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Acima de tudo isto, porém, esteja o amor, que é o vínculo da perfeição.
        </p>
        <p className="text-lg italic mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Colossenses 3:14
        </p>
      </div>
    </VintageBorder>
  );
}

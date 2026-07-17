import c1 from "../../assets/img/c1.jpeg";
import c2 from "../../assets/img/c2.jpeg";
import c3 from "../../assets/img/c3.jpeg";

import PhotoCard from "./PhotoCard";

const memories = [
  {
    image: c1,
    caption: "Amor",
    color: "text-orange-600",
    rotation: "-rotate-3",
  },
  {
    image: c2,
    caption: "Paz",
    color: "text-orange-600",
    rotation: "rotate-2",
  },
  {
    image: c3,
    caption: "Companheirismo",
    color: "text-orange-600",
    rotation: "-rotate-2",
  },
];

export default function BackgroundCarousel() {
  return (
    <section
      className="
        w-full
        py-10
      "
    >
      <div
        className="
          text-center
          mb-12
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            gap-4
            mb-4
          "
        >
        </div>

        <h2
          className="
            font-romantic
            text-5xl
            text-background
          "
        >
          Momentos 
        </h2>

        <p
          className="
            mt-4
            text-background/90
            max-w-xl
            mx-auto
            text-lg
          "
        >
          Alguns momentos que Deus escreveu
          em nossa história.
        </p>
      </div>

      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-10
        "
      >
        {memories.map((memory) => (
          <PhotoCard
            key={memory.caption}
            image={memory.image}
            caption={memory.caption}
            color={memory.color}
            rotation={memory.rotation}
          />
        ))}
      </div>
    </section>
  );
}
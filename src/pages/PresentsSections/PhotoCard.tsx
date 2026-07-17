interface PhotoCardProps {
  image: string;
  caption: string;
  color?: string;
  rotation?: string;
}

export default function PhotoCard({
  image,
  caption,
  color = "text-highlight2",
  rotation = "",
}: PhotoCardProps) {
  return (
    <div
      className={`
        ${rotation}
        bg-[#f7f0e6]
        p-4
        pb-8
        rounded-sm
        shadow-2xl
        border
        border-[#d9c6a5]
        transition-all
        duration-300
        hover:scale-105
        hover:-translate-y-2
        hover:rotate-0
      `}
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      }}
    >
      <div
        className="
          overflow-hidden
          border
          border-[#c7b08a]
        "
      >
        <img
          src={image}
          alt={caption}
          className="
            w-[260px]
            h-[320px]
            object-cover
            transition-transform
            duration-500
            hover:scale-110
          "
        />
      </div>

      <p
        className={`
          mt-5
          text-center
          font-romantic
          text-4xl
          ${color}
        `}
      >
        {caption}
      </p>
    </div>
  );
}
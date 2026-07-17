interface Props {
  title: string;
  subtitle?: string;
}

export default function ModalHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div
      className="
        mb-6
        flex
        flex-col
        items-center
        text-center
      "
    >
      <div
        className="
          mb-4
          h-[2px]
          w-24
          bg-gradient-to-r
          from-transparent
          via-[#DE9B72]
          to-transparent
        "
      />

      <h3
        className="
          text-3xl
          md:text-4xl
          font-romantic
          text-[#F8EDEB]
          text-center
          leading-tight
        "
      >
        {title}
      </h3>

      {subtitle && (
        <p
          className="
            mt-3
            max-w-md
            text-center
            text-sm
            md:text-base
            text-[#DE9B72]
            leading-relaxed
          "
        >
          {subtitle}
        </p>
      )}

      <div
        className="
          mt-4
          h-[2px]
          w-24
          bg-gradient-to-r
          from-transparent
          via-[#DE9B72]
          to-transparent
        "
      />
    </div>
  );
}
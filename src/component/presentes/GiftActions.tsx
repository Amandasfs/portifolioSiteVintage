interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function GiftActions({
  disabled,
  onClick,
}: Props) {
  return (
    <section
      className="
        mt-16
        flex
        justify-center
      "
    >
      <div
        className="
          relative

          w-full
          max-w-3xl

          overflow-hidden

          rounded-[28px]

          px-8
          py-10

          text-center

          shadow-[0_20px_60px_rgba(0,0,0,.25)]
        "
        style={{
          backgroundColor: "#4d6648ff",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/xv.png')",
          border: "2px solid #DE9B72",
        }}
      >
        {/* Detalhe interno */}
        <div
          className="
            absolute
            inset-3
            rounded-[22px]
            pointer-events-none
          "
          style={{
            border:
              "1px solid rgba(222,155,114,.35)",
          }}
        />

        {/* Ornamento Superior */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-4
            mb-5
          "
        >
          <div className="h-px w-16 bg-[#DE9B72]/60" />

          <span
            className="
              text-[#DE9B72]
              text-xl
            "
          >
            𓆩♡𓆪
          </span>

          <div className="h-px w-16 bg-[#DE9B72]/60" />
        </div>

        <h3
          className="
            font-romantic

            text-5xl
            md:text-6xl

            text-background

            mb-4
          "
        >
          Sua presença já é um presente
        </h3>

        <p
          className="
            max-w-2xl
            mx-auto

            text-background/90

            text-base
            md:text-lg

            leading-8
          "
        >
          Caso prefira não escolher um presente,
          você ainda pode confirmar sua presença
          e deixar uma mensagem especial para os noivos.
          Ficaremos muito felizes em celebrar esse
          momento com você.
        </p>

        <button
          onClick={onClick}
          disabled={disabled}
          className="
            mt-8

            px-10
            py-4

            rounded-2xl

            border-2
            border-[#DE9B72]

            bg-[#f5deb3]

            text-highlight3

            font-semibold

            shadow-lg

            transition-all
            duration-300

            hover:scale-105
            hover:shadow-xl

            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          Confirmar Presença Sem Presente
        </button>

        {/* Ornamento Inferior */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-4
            mt-8
          "
        >
          <div className="h-px w-16 bg-[#DE9B72]/60" />

          <span
            className="
              text-[#DE9B72]
              text-xl
            "
          >
            𓆩♡𓆪
          </span>

          <div className="h-px w-16 bg-[#DE9B72]/60" />
        </div>
      </div>
    </section>
  );
}
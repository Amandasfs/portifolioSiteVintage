import BackgroundCarousel from "./BackgroundPresents";

import florCanto from "../../assets/img/florCanto.png";
import carimbo from "../../assets/img/carimbo.svg";

export default function PageHeaderP() {
  return (
    <header
      className="
        relative
        w-full
        overflow-hidden
        text-white
      "
      style={{
        backgroundColor: "#4d6648ff",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/xv.png')",
      }}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-12
          md:py-16
          lg:py-20

          flex
          flex-col
          items-center
          gap-12
        "
      >
        {/* ===================================================== */}
        {/* POLAROIDS                                              */}
        {/* ===================================================== */}

        <div className="w-full">
          <BackgroundCarousel />
        </div>

        {/* ===================================================== */}
        {/* CARTA                                                  */}
        {/* ===================================================== */}

        <div
          className="
            relative

            w-full
            max-w-5xl

            px-6
            py-8

            sm:px-10
            sm:py-10

            md:px-14
            md:py-12

            rounded-[24px]

            overflow-hidden

            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
          style={{
            backgroundColor: "#B88370",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/xv.png')",
            border: "2px solid rgba(75,34,4,0.15)",
          }}
        >
          {/* ===================================================== */}
          {/* BORDA INTERNA                                         */}
          {/* ===================================================== */}

          <div
            className="
              absolute
              inset-3
              rounded-[18px]
              pointer-events-none
            "
            style={{
              border: "1px solid rgba(75,34,4,0.05)",
              boxShadow:
                "inset 0 0 30px rgba(75,34,4,0.15)",
            }}
          />

          {/* ===================================================== */}
          {/* ENVELHECIMENTO                                        */}
          {/* ===================================================== */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-65
            "
            style={{
              background: `
                radial-gradient(
                  circle at top left,
                  rgba(50, 22, 3, 0.73),
                  transparent 35%
                ),
                radial-gradient(
                  circle at bottom right,
                  rgba(50, 22, 3, 0.73),
                  transparent 50%
                )
              `,
            }}
          />

          {/* ===================================================== */}
          {/* CARIMBO                                                */}
          {/* ===================================================== */}

          <img
            src={carimbo}
            alt=""
            aria-hidden="true"
            className="
              absolute

              top-4
              left-4

              w-16
              sm:w-20
              md:w-24

              rotate-[-12deg]

              opacity-90

              pointer-events-none
            "
          />

          {/* ===================================================== */}
          {/* FLORES                                                 */}
          {/* ===================================================== */}

          <img
            src={florCanto}
            alt=""
            aria-hidden="true"
            className="
              absolute

              bottom-0
              right-0

              w-40
              sm:w-56
              md:w-72
              lg:w-80

              pointer-events-none
              select-none
            "
          />

          {/* ===================================================== */}
          {/* CONTEÚDO                                               */}
          {/* ===================================================== */}

          <div className="relative z-10">
            <h1
              className="
                text-center

                font-romantic

                text-highlight3

                text-5xl
                sm:text-6xl
                md:text-7xl

                leading-none

                mb-6
              "
            >
              Obrigada por
              <br />
              confirmar sua presença
            </h1>

            <div
              className="
                max-w-3xl
                mx-auto
                text-center
              "
            >
              <p
                className="
                  text-highlight3

                  text-base
                  sm:text-lg
                  md:text-xl

                  leading-8
                "
              >
                Sua presença é o maior presente que
                poderíamos receber.

                <br />
                <br />

                Mas, se desejar participar da
                construção do nosso novo lar,
                preparamos esta lista com muito
                carinho para tornar esse momento
                ainda mais especial.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p
                className="
                  font-romantic
                  text-highlight3

                  text-3xl
                  md:text-4xl
                "
              >
                Com amor,
              </p>

              <p
                className="
                  mt-1

                  font-romantic

                  text-highlight3

                  text-4xl
                  md:text-5xl
                "
              >
                Milene & Gabriel
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
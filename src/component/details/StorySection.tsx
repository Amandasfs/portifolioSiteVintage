export default function StorySection() {
  return (
    <section
      className="
        w-full
        flex
        flex-col
        items-center
      "
    >
      <h2
        className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-romantic
          text-highlight3
          text-center
          mb-6
        "
      >
        Nossa História
      </h2>

      {/* Ornamento Superior */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-16 sm:w-24 bg-[#4d6648ff]/40" />

        <span
          className="
            mx-4
            text-2xl
            text-[#4d6648ff]
          "
        >
          ❦
        </span>

        <div className="h-px w-16 sm:w-24 bg-[#4d6648ff]/40" />
      </div>

      {/* Carta */}
      <div
        className="
          relative
          w-full
          max-w-4xl
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          py-8
          sm:py-10
          rounded-2xl
          overflow-hidden
        "
        style={{
          backgroundColor: "rgba(255,252,250,0.05)",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/old-paper.png')",
          border: "1px solid rgba(222,155,114,.25)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,.12)",
        }}
      >
        {/* Efeito de papel */}
        <div
          className="
            absolute
            inset-0
            opacity-10
            pointer-events-none
          "
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        <div className="relative z-10">
          {/* Primeiro Parágrafo */}
          <p
            className="
              text-base
              sm:text-lg
              lg:text-xl
              leading-8
              sm:leading-9
              text-highlight3
              text-left
            "
          >
            <span
              className="
                float-left
                text-6xl
                sm:text-7xl
                lg:text-8xl
                font-romantic
                leading-none
                mr-2
                mt-1
                text-[#4d6648ff]
              "
            >
              T
            </span>

            udo começou em uma sala de aula. Quando Milene atravessou a porta
            pela primeira vez, seu olhar se encontrou com o olhar de Gabriel,
            por um breve instante. Não sabiam explicar o que sentiram, nem
            acreditavam em amor à primeira vista. Ainda assim, havia algo
            diferente naquele momento, uma semente silenciosa que o Senhor
            escolheu plantar em seus corações.

            <br />
            <br />

            Os dias passaram, as estações mudaram e a vida seguiu seu curso. A
            amizade nasceu de forma simples, leve e verdadeira, tornando-se
            abrigo, cumplicidade e porto seguro. Sem perceberem, Deus escrevia
            cada capítulo com uma delicadeza que somente o tempo seria capaz de
            revelar.
          </p>

          {/* Separador */}
          <div className="flex justify-center py-8">
            <span
              className="
                text-[#4d6648ff]
                text-2xl
                opacity-70
              "
            >
              ❦
            </span>
          </div>

          {/* Segundo Parágrafo */}
          <p
            className="
              text-base
              sm:text-lg
              lg:text-xl
              leading-8
              sm:leading-9
              text-highlight3
              text-left
            "
          >
            Os adolescentes que um dia dividiram os corredores da escola
            cresceram lado a lado. A amizade amadureceu, transformou-se em amor
            e, pouco a pouco, dois corações passaram a caminhar na mesma
            direção.

            <br />
            <br />

            Hoje, depois de tantos capítulos escritos com cuidado, gratidão e
            propósito, eles se preparam para viver o mais belo deles: o capítulo
            em que, diante de Deus, suas histórias deixam de ser duas e passam a
            ser uma só.
          </p>

          {/* Frase de Transição */}
          <div
            className="
              mt-10
              text-center
            "
          >
            <p
              className="
                italic
                text-lg
                sm:text-xl
                text-highlight3
              "
            >
              E assim começa o seu "felizes para sempre".
            </p>
          </div>

          {/* Assinatura */}
          <div
            className="
              mt-8
              text-center
            "
          >
            <p
              className="
                italic
                text-highlight3
                text-lg
              "
            >
              Com amor,
            </p>

            <p
              className="
                mt-2
                font-romantic
                text-3xl
                sm:text-4xl
                lg:text-5xl
                text-highlight3
              "
            >
              Milene & Gabriel
            </p>
          </div>

          {/* Frase Final */}
          <div
            className="
              mt-10
              pt-8
              border-t
              border-[#4d6648ff]/20
              text-center
            "
          >
            <p
              className="
                italic
                font-romantic
                text-3xl
                sm:text-4xl
                lg:text-5xl
                leading-tight
                text-highlight3
              "
            >
              "O verdadeiro amor não é algo que se encontra,
              <br />
              mas algo que se constrói."
            </p>
          </div>
        </div>
      </div>

      {/* Ornamento Inferior */}
      <div className="flex items-center justify-center mt-8">
        <div className="h-px w-16 sm:w-24 bg-[#4d6648ff]/40" />

        <span
          className="
            mx-4
            text-2xl
            text-[#4d6648ff]
          "
        >
          ❦
        </span>

        <div className="h-px w-16 sm:w-24 bg-[#4d6648ff]/40" />
      </div>
    </section>
  );
}
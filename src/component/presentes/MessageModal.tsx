interface ReservaPendente {
  id: string;
  tipo: "compra" | "pix" | "skip";
  valor: number;
  nome: string;
}

interface MessageModalProps {
  reservaPendente: ReservaPendente;
  mensagemConvidado: string;
  nomeConvidado: string;
  salvando: boolean;
  onMensagemChange: (value: string) => void;
  onNomeChange: (value: string) => void;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function MessageModal({
  reservaPendente,
  mensagemConvidado,
  nomeConvidado,
  salvando,
  onMensagemChange,
  onNomeChange,
  onCancelar,
  onConfirmar,
}: MessageModalProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-3
        sm:p-6
        bg-black/75
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-2xl
          rounded-[24px]
          sm:rounded-[28px]
          shadow-[0_20px_60px_rgba(0,0,0,.55)]
          overflow-hidden
          transition-all
          duration-300
        "
      >
        {/* Moldura Fina Vintage */}
        <div
          className="
            absolute
            inset-0
            rounded-[24px]
            sm:rounded-[28px]
            pointer-events-none
            z-20
          "
          style={{
            border: "2px solid #DE9B72",
            margin: "4px", // Deixa um pequeno recuo charmoso na borda
          }}
        />

        {/* Fundo Verde Elegante com Backdrop Blur e Textura */}
        <div
          className="
            relative
            p-5
            xs:p-6
            sm:p-8
            md:p-10
            max-h-[calc(100vh-2rem)]
            overflow-y-auto
            overflow-x-hidden
            scrollbar-thin
            backdrop-blur-md
          "
          style={{
            backgroundColor: "rgba(58, 85, 68, 0.95)", // #3A5544 com opacidade alta para o modal isolar bem o fundo
            backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
            backgroundAttachment: "local",
          }}
        >
          {/* Mancha suave estática de fundo para dar profundidade ao verde */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-25
              z-0
            "
            style={{
              background: `
                radial-gradient(
                  circle at top left,
                  rgba(222,155,114,.15),
                  transparent 45%
                ),
                radial-gradient(
                  circle at bottom right,
                  rgba(0,0,0,.3),
                  transparent 50%
                )
              `,
            }}
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Cabeçalho */}
            <div className="text-center mb-5 sm:mb-8">
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  sm:gap-4
                  mb-3
                "
              >
                <div className="h-px w-10 sm:w-16 bg-[#DE9B72]/70" />
                <span className="text-[#DE9B72] text-xs sm:text-base select-none">𓆩♡𓆪</span>
                <div className="h-px w-10 sm:w-16 bg-[#DE9B72]/70" />
              </div>

              <h2
                className="
                  font-romantic
                  text-3xl
                  xs:text-4xl
                  sm:text-5xl
                  text-[#F8EDEB]
                  tracking-wide
                  leading-tight
                "
              >
                Uma Mensagem
              </h2>

              <p
                className="
                  mt-2
                  sm:mt-3
                  text-xs
                  sm:text-base
                  text-[#F8EDEB]/80
                  px-2
                "
              >
                {reservaPendente.tipo === "skip" ? (
                  "Ficamos felizes com sua presença."
                ) : (
                  <>
                    Você escolheu:
                    <br />
                    <strong className="break-words font-semibold text-[#DE9B72]">
                      {reservaPendente.nome}
                    </strong>
                  </>
                )}
              </p>
            </div>

            {/* Corpo / Inputs */}
            <div className="space-y-4 sm:space-y-6">
              {/* Mensagem */}
              <div>
                <label
                  className="
                    block
                    mb-1.5
                    text-xs
                    sm:text-sm
                    text-[#F8EDEB]/90
                    font-medium
                    tracking-wide
                  "
                >
                  Sua mensagem aos noivos
                </label>
                <textarea
                  value={mensagemConvidado}
                  onChange={(e) => onMensagemChange(e.target.value)}
                  placeholder="Escreva aqui uma mensagem especial..."
                  className="
                    w-full
                    h-28
                    sm:h-36
                    resize-none
                    rounded-xl
                    border
                    border-[#DE9B72]/40
                    bg-black/20
                    p-3
                    sm:p-4
                    text-sm
                    text-[#F8EDEB]
                    placeholder-[#DE9B72]/50
                    focus:outline-none
                    focus:border-[#DE9B72]
                    focus:ring-1
                    focus:ring-[#DE9B72]
                    focus:bg-black/30
                    shadow-inner
                    transition-all
                  "
                />
              </div>

              {/* Nome */}
              <div>
                <label
                  className="
                    block
                    mb-1.5
                    text-xs
                    sm:text-sm
                    text-[#F8EDEB]/90
                    font-medium
                    tracking-wide
                  "
                >
                  Assinatura (Opcional)
                </label>
                <input
                  type="text"
                  value={nomeConvidado}
                  onChange={(e) => onNomeChange(e.target.value)}
                  placeholder="Seu nome"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#DE9B72]/40
                    bg-black/20
                    p-3
                    sm:p-4
                    text-sm
                    text-[#F8EDEB]
                    placeholder-[#DE9B72]/50
                    focus:outline-none
                    focus:border-[#DE9B72]
                    focus:ring-1
                    focus:ring-[#DE9B72]
                    focus:bg-black/30
                    shadow-inner
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Assinatura visual romântica */}
            <div className="my-6 sm:my-8 text-center select-none decoration-clone">
              <p className="font-romantic text-xl sm:text-2xl text-[#F8EDEB]/90">
                Com carinho,
              </p>
              <p className="font-romantic text-2xl sm:text-4xl text-[#DE9B72] mt-0.5 sm:mt-1">
                Milene & Gabriel
              </p>
            </div>

            {/* Botões do Rodapé */}
            <div
              className="
                flex
                flex-col-reverse
                sm:flex-row
                justify-center
                gap-2.5
                sm:gap-4
              "
            >
              <button
                onClick={onCancelar}
                disabled={salvando}
                className="
                  w-full
                  sm:w-32
                  px-5
                  py-2.5
                  sm:py-3
                  rounded-xl
                  border
                  border-[#DE9B72]
                  text-[#F8EDEB]
                  font-medium
                  text-sm
                  hover:bg-[#DE9B72]/15
                  active:bg-[#DE9B72]/25
                  disabled:opacity-50
                  transition-all
                "
              >
                Voltar
              </button>

              <button
                onClick={onConfirmar}
                disabled={salvando}
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-44
                  px-6
                  py-2.5
                  sm:py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[#442D1C]
                  to-[#5A3A24]
                  text-[#F8EDEB]
                  border-2
                  border-[#DE9B72]/40
                  font-bold
                  text-sm
                  uppercase
                  tracking-wider
                  hover:brightness-110
                  hover:scale-[1.01]
                  active:brightness-95
                  disabled:opacity-50
                  shadow-md
                  transition-all
                "
              >
                {salvando
                  ? "Salvando..."
                  : reservaPendente.tipo === "pix"
                  ? "Gerar PIX"
                  : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
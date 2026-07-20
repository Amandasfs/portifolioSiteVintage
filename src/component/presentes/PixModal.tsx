import pixNoivos from "../../assets/img/pixnoivos.jpeg";

// Import da imagem de canto idêntico ao MessageModal
import cornerImage from "../../assets/img/cornerImage.png";

interface PixModalProps {
  nomePresente: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PixModal({
  nomePresente,
  onClose,
  onSuccess,
}: PixModalProps) {
  const codigoPix =
    "00020126580014BR.GOV.BCB.PIX013630432049-4afc-4d59-a3cf-799b9f6db7e15204000053039865802BR5925Milene Monteiro de Moraes6009SAO PAULO62140510ARNgXpoC016304E48D";

  const copiarPix = async () => {
    await navigator.clipboard.writeText(codigoPix);
    alert("Código PIX copiado para a área de transferência.");
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-xl
          rounded-2xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* Moldura externa dourada */}
        <div
          className="
            absolute
            inset-0
            rounded-2xl
            pointer-events-none
            z-20
          "
          style={{
            border: "2px solid #DE9B72",
            boxShadow: `
              0 0 0 3px rgba(222,155,114,.15),
              0 0 0 6px rgba(222,155,114,.08)
            `,
          }}
        />

        {/* Fundo Verde com Textura correspondente à identidade do projeto */}
        <div
          className="
            relative
            p-6
            sm:p-8
            md:p-10
            max-h-[calc(100vh-2rem)]
            overflow-y-auto
            overflow-x-hidden
            scrollbar-thin
          "
          style={{
            backgroundColor: "#4d6648",
            backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')",
          }}
        >
          {/* Cantos decorativos idênticos */}
          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="absolute top-0 left-0 w-14 h-14 opacity-90 z-10"
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 w-14 h-14 scale-x-[-1] opacity-90 z-10"
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-14 h-14 scale-y-[-1] opacity-90 z-10"
          />

          <img
            src={cornerImage}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-14 h-14 scale-x-[-1] scale-y-[-1] opacity-90 z-10"
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Cabeçalho */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
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
                Presente via Pix
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-[#F8EDEB]/80 px-2">
                Sua contribuição será uma lembrança especial para nós.
              </p>
            </div>

            {/* Bloco Presente Selecionado */}
            <div className="text-center mb-6 bg-black/10 rounded-xl py-3 px-4 border border-[#DE9B72]/20">
              <span
                className="
                  block
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.2em]
                  text-[#DE9B72]
                  font-medium
                "
              >
                Presente Selecionado
              </span>
              <h3
                className="
                  mt-1
                  text-lg
                  sm:text-xl
                  font-semibold
                  text-[#F8EDEB]
                  break-words
                "
              >
                {nomePresente}
              </h3>
            </div>

            {/* Container do QR Code */}
            <div className="flex justify-center mb-6">
              <div
                className="
                  p-3
                  rounded-2xl
                  shadow-xl
                  border
                  border-[#DE9B72]/30
                  bg-black/20
                "
              >
                <div className="bg-white p-3 rounded-xl">
                  <img
                    src={pixNoivos}
                    alt="QR Code PIX"
                    className="
                      w-[160px]
                      h-[160px]
                      sm:w-[220px]
                      sm:h-[220px]
                      object-contain
                    "
                  />
                </div>
              </div>
            </div>

            {/* Texto Auxiliar */}
            <p className="text-center text-xs sm:text-sm text-[#F8EDEB]/90 mb-5 leading-relaxed">
              Escaneie o QR Code acima usando o aplicativo do seu banco ou copie o código abaixo.
            </p>

            {/* PIX Copia e Cola */}
            <div
              className="
                mb-6
                rounded-xl
                border
                border-[#DE9B72]/30
                bg-black/20
                p-4
              "
            >
              <span
                className="
                  block
                  text-center
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.15em]
                  text-[#DE9B72]
                  mb-2
                  font-medium
                "
              >
                Código Copia e Cola
              </span>

              <div
                className="
                  rounded-lg
                  bg-black/30
                  border
                  border-[#DE9B72]/20
                  p-3
                  text-xs
                  text-[#F8EDEB]/90
                  break-all
                  select-all
                  max-h-20
                  overflow-y-auto
                  scrollbar-thin
                  text-center
                  mb-3
                "
              >
                {codigoPix}
              </div>

              <button
                onClick={copiarPix}
                className="
                  w-full
                  py-2.5
                  rounded-lg
                  bg-[#DE9B72]
                  hover:bg-[#cc8a62]
                  text-[#4d6648]
                  font-bold
                  text-xs
                  uppercase
                  tracking-wider
                  transition-all
                  shadow-sm
                "
              >
                Copiar Código PIX
              </button>
            </div>

            {/* Assinatura romântica */}
            <div className="mb-6 text-center select-none">
              <p className="font-romantic text-xl sm:text-2xl text-[#F8EDEB]/90">
                Com carinho,
              </p>
              <p className="font-romantic text-2xl sm:text-4xl text-[#DE9B72] mt-0.5">
                Milene & Gabriel
              </p>
            </div>

            {/* Botões de Ação */}
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
                onClick={onClose}
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
                  transition-all
                "
              >
                Fechar
              </button>

              <button
                onClick={onSuccess}
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
                  shadow-md
                  transition-all
                "
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import cornerImage from "../../assets/img/cornerImage.png";

export default function ThanksConfirm({
  isOpen,
  onClose,
  isDeclined = false, // Passamos essa prop para mudar a mensagem caso a pessoa não possa ir
}: {
  isOpen: boolean;
  onClose: () => void;
  isDeclined?: boolean;
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-[480px] rounded-2xl p-6 md:p-8 shadow-2xl text-center border-2 border-[#DE9B72] overflow-hidden animate-in fade-in zoom-in duration-300"
        style={{
          backgroundColor: "#4d6648",
          backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        }}
      >
        {/* Cantos decorativos */}
        <img src={cornerImage} className="absolute top-0 left-0 w-12 h-12 opacity-80" alt="corner" />
        <img src={cornerImage} className="absolute top-0 right-0 w-12 h-12 scale-x-[-1] opacity-80" alt="corner" />
        <img src={cornerImage} className="absolute bottom-0 left-0 w-12 h-12 scale-y-[-1] opacity-80" alt="corner" />
        <img src={cornerImage} className="absolute bottom-0 right-0 w-12 h-12 scale-[-1] opacity-80" alt="corner" />

        <div className="relative z-10 text-background flex flex-col items-center">
          
          {/* Ícone de Sucesso */}
          <div className="w-16 h-16 mb-4 rounded-full border-2 border-[#DE9B72] bg-[#3A5544]/60 flex items-center justify-center text-[#DE9B72] text-3xl">
            {isDeclined ? "🤍" : "✨"}
          </div>

          <h3 className="text-4xl font-romantic mb-4 text-[#F8EDEB] drop-shadow-md">
            Muito Obrigado!
          </h3>

          {/* Mensagem dinâmica dependendo se a pessoa vai ou não */}
          <p className="text-[#F8EDEB]/90 text-lg mb-8 leading-relaxed">
            {isDeclined 
              ? "Sentiremos muito a sua falta, mas agradecemos o carinho de nos avisar. Você estará em nossos corações!"
              : "Sua presença foi confirmada com sucesso. Mal podemos esperar para celebrar esse momento inesquecível com você!"}
          </p>

          <div className="flex flex-col gap-4 w-full items-center">
            {/* Se a pessoa vai ao casamento, damos mais ênfase no botão de presentes */}
            {!isDeclined && (
              <button
                onClick={() => {
                  onClose();
                  navigate('/prezents');
                }}
                className="w-full max-w-[280px] bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] font-bold px-6 py-3 rounded-xl border-2 border-[#DE9B72]/40 hover:scale-105 transition-transform"
              >
                Ver Lista de Presentes
              </button>
            )}

            <button
              onClick={onClose}
              className={`w-full max-w-[280px] font-bold px-6 py-3 rounded-xl border-2 transition-transform hover:scale-105 ${
                isDeclined 
                  ? "bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] border-[#DE9B72]/40" 
                  : "bg-transparent border-[#DE9B72]/40 text-[#F8EDEB] hover:bg-[#3A5544]/60"
              }`}
            >
              Voltar ao Início
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import type { Presente } from "../../types/Presente";
import MensagemSucessoModal from "../../component/MensagemSucessoModal";

interface PresenteCardProps {
  presente: Presente;
  disabled: boolean;
  onReservar: () => void;
  onReservarPix: () => void;
  onCopiarPix: () => void;
}

function PresenteCard({
  presente,
  disabled,
  onReservar,
  onReservarPix,
  onCopiarPix,
}: PresenteCardProps) {
  const { nome, valor, imagem, reservado } = presente;

  return (
    <div
      className={`bg-white border border-[#d4af37] rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg ${
        disabled && !reservado ? "opacity-40 cursor-not-allowed" : "opacity-100"
      } ${reservado ? "bg-[#f8f9fa] border-2 border-green-500" : ""}`}
    >
      <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-[#e8d9c5]">
        <img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-serif font-semibold text-[#5b3a29] mb-2 text-center leading-tight">
        {nome}
      </h3>
      <p className="text-[#8b7355] font-medium mb-4 font-serif">R$ {valor}</p>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onReservar}
          disabled={disabled || reservado}
          className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            reservado || disabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#5b3a29] text-white hover:bg-[#3f2a1f] hover:shadow-md"
          }`}
        >
          {reservado ? "Presente Reservado" : "Reservar Presente"}
        </button>

        <a
          href="#"
          className={`px-4 py-3 rounded-lg font-medium text-center border transition-colors duration-300 ${
            reservado
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#5b3a29] text-[#5b3a29] hover:bg-[#5b3a29] hover:text-white"
          }`}
          onClick={(e) => reservado && e.preventDefault()}
        >
          Ver Link
        </a>

        <button
          onClick={onReservarPix}
          disabled={reservado}
          className={`px-4 py-3 rounded-lg font-medium border transition-colors duration-300 ${
            reservado
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white"
          }`}
        >
          Contribuir com PIX
        </button>
      </div>

      {reservado && (
        <div className="mt-3 flex items-center gap-2 text-green-600 font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Reservado
        </div>
      )}
    </div>
  );
}

export default function PresentesGrid() {
  const [presenteSelecionado, setPresenteSelecionado] = useState<number | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const presentesFicticios: Presente[] = [
    {
      id: 1,
      nome: "Jogo de Chá Vintage",
      valor: 150,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Chá+Vintage",
      reservado: false,
      tipoReserva: "compra",
    },
    {
      id: 2,
      nome: "Conjunto de Taças",
      valor: 200,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Taças+Cristal",
      reservado: false,
      tipoReserva: "compra",
    },
    {
      id: 3,
      nome: "Porta-Retratos Clássico",
      valor: 100,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Porta+Retratos",
      reservado: false,
      tipoReserva: "compra",
    },
    {
      id: 4,
      nome: "Vaso Decorativo",
      valor: 80,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Vaso+Cerâmica",
      reservado: false,
      tipoReserva: "compra",
    },
    {
      id: 5,
      nome: "Caixa de Chocolates Gourmet",
      valor: 120,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Chocolates",
      reservado: false,
      tipoReserva: "compra",
    },
    {
      id: 6,
      nome: "Cesta de Café da Manhã",
      valor: 180,
      link: "#",
      imagem: "https://via.placeholder.com/300x300/f3e6d0/5b3a29?text=Cesta+Café",
      reservado: false,
      tipoReserva: "compra",
    },
  ];

      const handleSelecionarPresente = (id: number) => {
      if (presenteSelecionado !== null) return;

      const presenteIndex = presentesFicticios.findIndex((p) => p.id === id);
      if (presenteIndex !== -1) {
        presentesFicticios[presenteIndex].reservado = true;
      }

      setPresenteSelecionado(id);
      setMensagemSucesso("Presente reservado com sucesso!");
    };

    const handleNaoPresentear = () => {
      if (presenteSelecionado !== null) return;

      setPresenteSelecionado(-1);
      setMensagemSucesso("Presença confirmada com sucesso!");
    };


  return (
    <section
      className="w-full min-h-screen py-16 px-6"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #f3e6d0 0%, #442d1c 100%), url("https://www.transparenttextures.com/patterns/snow.png")',
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f3e6d0] mb-4">
            Lista de Presentes
          </h1>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-6"></div>
          <p className="text-[#f5e6d0] text-lg max-w-2xl mx-auto leading-relaxed">
            Escolha com carinho o presente que gostaria de nos oferecer.
            Cada presente pode ser selecionado apenas uma vez.
          </p>
        </div>

        <div className="bg-white/80 border border-[#e8d9c5] rounded-xl p-6 mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-serif font-semibold text-[#5b3a29]">
              Informação Importante
            </h3>
          </div>
          <p className="text-[#8b7355]">
            Os noivos não saberão qual presente você escolheu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {presentesFicticios.map((presente) => (
            <PresenteCard
              key={presente.id}
              presente={presente}
              disabled={presenteSelecionado !== null && presenteSelecionado !== presente.id}
              onReservar={() => handleSelecionarPresente(presente.id)}
              onReservarPix={() => {
                alert(`Chave PIX: casal@casamento.com\nValor: R$ ${presente.valor}`);
              }}
              onCopiarPix={() => {
                navigator.clipboard.writeText(`casal@casamento.com`);
                alert("Chave PIX copiada!");
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={handleNaoPresentear}
              disabled={presenteSelecionado !== null}
              className="px-8 py-4 font-semibold rounded-lg shadow-lg text-white text-base transition-all transform hover:scale-105"
              style={{
                backgroundColor: "#4d6648ff",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/xv.png')",
                backgroundSize: "cover",
                border: "2px solid #DE9B72",
                opacity: presenteSelecionado !== null ? 0.5 : 1,
                cursor: presenteSelecionado !== null ? "not-allowed" : "pointer",
              }}
            >
              Não quero presentear, apenas confirmar presença
            </button>
          </div>


        {/* Mensagem de sucesso */}
        {mensagemSucesso && (
          <MensagemSucessoModal
            mensagemPrincipal={mensagemSucesso}
            citaBiblica={`"Ninguém jamais viu a Deus; se nos amarmos uns aos outros, Deus permanece em nós, e o seu amor é aperfeiçoado em nós" 1 João 4:12`}
          />
        )}

      </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

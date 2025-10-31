import { useState } from "react";
import type { Presente } from "../../types/Presente";

interface Props {
  presente: Presente;
  disabled?: boolean;
  onReservar: () => void;
  onReservarPix: () => void;
  onCopiarPix: () => void;
  isUserReservouAlgumPresente?: boolean;
}

export default function PresenteCard({
  presente,
  disabled = false,
  onReservar,
  onReservarPix,
  onCopiarPix,
  isUserReservouAlgumPresente = false,
}: Props) {
  const [reservado, setReservado] = useState(false);

  const handleReservar = () => {
    setReservado(true);
    onReservar();
  };

  // Botão de RESERVA bloqueia se:
  // - Este presente já estiver reservado OU
  // - O usuário já reservou QUALQUER outro presente
  const isReservaDisabled = reservado || isUserReservouAlgumPresente;

  // Botões de LINK e PIX só bloqueiam se ESTE presente específico estiver reservado
  const isLinkPixDisabled = reservado;

  return (
    <div
      className={`relative bg-[#2c1810] border-2 border-[#8B4513] rounded-lg shadow-2xl p-6 flex flex-col items-center transition-all duration-500 hover:shadow-2xl group ${
        isReservaDisabled && !reservado ? "opacity-70 cursor-not-allowed" : "opacity-100"
      } ${reservado ? "ring-2 ring-[#d4af37] ring-opacity-30 bg-[#3a2418]" : ""}`}
    >
      {/* Ornamentos vitorianos */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-[#8B4513] rounded-full opacity-60" />
      <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-[#8B4513] rounded-full opacity-60" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-2 border-[#8B4513] rounded-full opacity-60" />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-[#8B4513] rounded-full opacity-60" />
      
      {/* Moldura decorativa superior */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-1 bg-[#8B4513] rounded-full" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#d4af37] rounded-full" />
      </div>

      {/* Moldura da imagem estilo vitoriano */}
      <div className="relative w-full h-48 mb-6 group-hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 border-4 border-[#5d4037] rounded-lg pointer-events-none z-10 shadow-inner" />
        <div className="absolute -inset-2 border-2 border-[#8B4513] rounded-lg pointer-events-none opacity-50" />
        <img
          src={presente.imagem}
          alt={presente.nome}
          className="w-full h-full object-cover rounded-lg grayscale-10 group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Overlay dramático */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2c1810]/40 to-[#2c1810]/80 pointer-events-none rounded-lg" />
      </div>

      {/* Nome e preço com estilo clássico */}
      <div className="text-center mb-6 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#8B4513] opacity-60" />
        <h3 className="text-xl font-serif font-bold text-[#e8d9c5] mb-3 leading-tight tracking-wide">
          {presente.nome}
        </h3>
        <p className="text-lg font-light text-[#d4af37] font-serif italic">
          R$ {presente.valor}
        </p>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#8B4513] opacity-60" />
      </div>

      {/* Botões com estilo vitoriano */}
      <div className="flex flex-col gap-3 w-full">
        {/* Botão Reservar - bloqueia se usuário já reservou qualquer presente */}
        <button
          onClick={handleReservar}
          disabled={isReservaDisabled}
          className={`relative px-6 py-3 rounded-lg font-serif font-semibold text-white transition-all duration-300 overflow-hidden border ${
            isReservaDisabled 
              ? "bg-[#5d4037] border-[#8B4513] cursor-not-allowed text-gray-400" 
              : "bg-[#8B4513] border-[#a0522d] hover:bg-[#a0522d] hover:border-[#d4af37] hover:text-[#f8f3e9] hover:shadow-lg transform hover:-translate-y-1"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {reservado ? (
              <>
                <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
                Presente Reservado
              </>
            ) : isUserReservouAlgumPresente ? (
              "Limite Atingido"
            ) : (
              "Reservar Presente"
            )}
          </span>
        </button>

        {/* Botão Ver Link - só bloqueia se ESTE presente estiver reservado */}
        <a
          href={presente.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-3 rounded-lg font-serif font-medium text-center border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
            isLinkPixDisabled
              ? "bg-[#3a2418] border-[#5d4037] text-[#8b7355] cursor-not-allowed"
              : "bg-[#3a2418] border-[#8B4513] text-[#e8d9c5] hover:bg-[#8B4513] hover:text-[#f8f3e9] hover:border-[#d4af37] hover:shadow-lg transform hover:-translate-y-1"
          }`}
          onClick={(e) => isLinkPixDisabled && e.preventDefault()}
        >
          <span>Ver Link</span>
          <svg className={`w-4 h-4 transition-transform ${!isLinkPixDisabled && "group-hover:translate-x-1"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* Botão PIX - só bloqueia se ESTE presente estiver reservado */}
        <button
          onClick={onReservarPix}
          disabled={isLinkPixDisabled}
          className={`px-6 py-3 rounded-lg font-serif font-medium text-center border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
            isLinkPixDisabled
              ? "bg-[#3a2418] border-[#5d4037] text-[#8b7355] cursor-not-allowed"
              : "bg-[#3a2418] border-[#8B4513] text-[#e8d9c5] hover:bg-[#8B4513] hover:text-[#f8f3e9] hover:border-[#d4af37] hover:shadow-lg transform hover:-translate-y-1"
          }`}
        >
          <span>Contribuir com PIX</span>
          <svg className={`w-4 h-4 transition-transform ${!isLinkPixDisabled && "group-hover:scale-110"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </button>
      </div>

      {/* Indicador de reserva dramático */}
      {reservado && (
        <div className="mt-4 p-3 bg-[#3a2418] border border-[#d4af37] rounded-lg text-[#d4af37] font-serif font-semibold text-center flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Presente Reservado por Você
        </div>
      )}

      {/* Overlay de bloqueio quando usuário já reservou outro presente */}
      {isUserReservouAlgumPresente && !reservado && (
        <div className="absolute inset-0 bg-[#2c1810]/90 rounded-lg flex items-center justify-center pointer-events-none z-20">
          <div className="text-center p-4">
            <div className="w-12 h-12 border-2 border-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#e8d9c5] font-serif font-semibold text-sm mb-1">Limite de Reserva</p>
            <p className="text-[#8b7355] font-serif text-xs">Você já reservou um presente</p>
          </div>
        </div>
      )}
    </div>
  );
}
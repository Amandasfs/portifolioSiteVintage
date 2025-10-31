import { useState } from "react";
import cornerImage from "../assets/img/cornerImage.png";
import { useNavigate } from "react-router-dom";

// Dados mockados - no futuro virão do banco
const FAMILIAS_MOCK = [
  {
    id: 1,
    nomeFamilia: "4321",
    membros: [
      { id: 1, nome: "João Silva", confirmado: false },
      { id: 2, nome: "Maria Silva", confirmado: false },
      { id: 3, nome: "Pedro Silva", confirmado: false }
    ]
  },
  {
    id: 2,
    nomeFamilia: "1234",
    membros: [
      { id: 4, nome: "Carlos Santos", confirmado: false },
      { id: 5, nome: "Ana Santos", confirmado: false }
    ]
  },
  {
    id: 3,
    nomeFamilia: "6789",
    membros: [
      { id: 6, nome: "Paulo Oliveira", confirmado: false },
      { id: 7, nome: "Julia Oliveira", confirmado: false },
      { id: 8, nome: "Lucas Oliveira", confirmado: false },
      { id: 9, nome: "Fernanda Oliveira", confirmado: false }
    ]
  }
];

export default function ConfirmModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [naoIrei, setNaoIrei] = useState(false);
  const [familiaSelecionada, setFamiliaSelecionada] = useState("");
  const [membrosConfirmados, setMembrosConfirmados] = useState<number[]>([]);
  const [familiaCarregada, setFamiliaCarregada] = useState<any>(null);
    const navigate = useNavigate(); 

  // Função para simular busca da família no banco
  const carregarFamilia = (token: string) => {
    // Aqui futuramente será uma chamada API
    const familia = FAMILIAS_MOCK.find(f => 
      f.nomeFamilia.toLowerCase().includes(token.toLowerCase())
    );
    setFamiliaCarregada(familia || null);
    setMembrosConfirmados([]);
  };

  const toggleMembroConfirmado = (membroId: number) => {
    setMembrosConfirmados(prev => 
      prev.includes(membroId)
        ? prev.filter(id => id !== membroId)
        : [...prev, membroId]
    );
  };

  const selecionarTodosMembros = () => {
    if (familiaCarregada) {
      setMembrosConfirmados(familiaCarregada.membros.map((m: any) => m.id));
    }
  };

  const deselecionarTodosMembros = () => {
    setMembrosConfirmados([]);
  };

  if (!isOpen) return null;
const handleConfirmar = () => {
  navigate("/prezents");
};
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="relative w-[480px] rounded-2xl p-8 shadow-2xl text-center border-2 border-[#DE9B72] overflow-hidden"
        style={{
          backgroundColor: "#4d6648",
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        }}
      >
        {/* Cantos Decorativos */}
        <img
          src={cornerImage}
          className="absolute top-0 left-0 w-16 h-16 opacity-80"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute top-0 right-0 w-16 h-16 scale-x-[-1] opacity-80"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute bottom-0 right-0 w-16 h-16 scale-[-1] opacity-80"
          alt="corner"
        />
        <img
          src={cornerImage}
          className="absolute bottom-0 left-0 w-16 h-16 scale-y-[-1] opacity-80"
          alt="corner"
        />

        {/* Efeito de papel envelhecido */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DE9B72]/10 to-[#8B4513]/5 mix-blend-overlay"></div>

        {/* Conteúdo */}
        <div className="relative z-10 text-background">
          <h3 className="text-3xl font-romantic mb-6 tracking-wide text-[#F8EDEB] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Confirmar Presença
          </h3>

          {/* Input do Token */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Digite o token do convite"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#DE9B72] bg-[#3A5544]/80 backdrop-blur-sm text-[#F8EDEB] placeholder-[#DE9B72]/70 focus:outline-none focus:ring-2 focus:ring-[#DE9B72] focus:border-transparent transition-all duration-300 font-medium shadow-lg"
              style={{
                background: "linear-gradient(135deg, #3A5544 0%, #4d6648 100%)",
              }}
            />
            <div className="absolute inset-0 rounded-xl border border-[#F8EDEB]/20 pointer-events-none"></div>
          </div>

          {/* Botão para carregar família */}
          <div className="mb-6">
            <button
              onClick={() => carregarFamilia(token)}
              disabled={!token.trim()}
              className="relative bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] font-semibold px-6 py-2 rounded-xl hover:from-[#5A3A24] hover:to-[#6D4A32] transition-all duration-300 shadow-lg border-2 border-[#DE9B72]/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar Família
            </button>
          </div>

          {/* Seção de seleção de membros - aparece apenas quando família é carregada */}
          {familiaCarregada && (
            <div className="mb-6 p-4 rounded-xl border-2 border-[#DE9B72]/40 bg-[#3A5544]/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-romantic text-[#F8EDEB]">
                  {familiaCarregada.nomeFamilia}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={selecionarTodosMembros}
                    className="px-3 py-1 text-xs bg-[#442D1C] text-[#F8EDEB] rounded-lg border border-[#DE9B72]/40 hover:bg-[#5A3A24] transition-all"
                  >
                    Todos
                  </button>
                  <button
                    onClick={deselecionarTodosMembros}
                    className="px-3 py-1 text-xs bg-[#3A5544] text-[#F8EDEB] rounded-lg border border-[#DE9B72]/40 hover:bg-[#4d6648] transition-all"
                  >
                    Nenhum
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {familiaCarregada.membros.map((membro: any) => (
                  <div
                    key={membro.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#DE9B72]/30 bg-[#3A5544]/40 hover:bg-[#3A5544]/60 transition-all cursor-pointer group"
                    onClick={() => toggleMembroConfirmado(membro.id)}
                  >
                    <span className="text-[#F8EDEB] font-medium group-hover:text-[#DE9B72] transition-colors">
                      {membro.nome}
                    </span>
                    
                    {/* Checkbox customizado */}
                    <div className="relative">
                      <div className={`w-6 h-6 rounded border-2 transition-all duration-300 ${
                        membrosConfirmados.includes(membro.id)
                          ? 'bg-[#DE9B72] border-[#DE9B72]'
                          : 'border-[#DE9B72]/60 bg-transparent'
                      }`}>
                        {membrosConfirmados.includes(membro.id) && (
                          <svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#3A5544] pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contador de confirmados */}
              <div className="mt-3 pt-3 border-t border-[#DE9B72]/20">
                <p className="text-[#F8EDEB] text-sm">
                  {membrosConfirmados.length} de {familiaCarregada.membros.length} membros confirmados
                </p>
              </div>
            </div>
          )}

          {/* Checkbox "Não irei" */}
          <div className="flex items-center mb-6 justify-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                id="naoIrei"
                checked={naoIrei}
                onChange={(e) => {
                  setNaoIrei(e.target.checked);
                  if (e.target.checked) {
                    setMembrosConfirmados([]);
                  }
                }}
                className="w-5 h-5 appearance-none rounded border-2 border-[#DE9B72] bg-[#3A5544]/80 checked:bg-[#DE9B72] checked:border-[#DE9B72] transition-all duration-300 cursor-pointer"
              />
              {naoIrei && (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-[#3A5544] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <label htmlFor="naoIrei" className="text-[#F8EDEB] font-medium cursor-pointer">
              Não irei à cerimônia
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-3 justify-center">
            <button 
              disabled={!naoIrei && membrosConfirmados.length === 0}
               onClick={handleConfirmar} 
              className="relative bg-gradient-to-r from-[#442D1C] to-[#5A3A24] text-[#F8EDEB] font-bold px-6 py-3 rounded-xl hover:from-[#5A3A24] hover:to-[#6D4A32] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-[#DE9B72]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10">
                {naoIrei ? 'Confirmar Ausência' : `Confirmar (${membrosConfirmados.length})`}
              </span>
              <div className="absolute inset-0 rounded-xl border border-[#F8EDEB]/20"></div>
            </button>
            <button
              onClick={onClose}
              className="relative bg-[#3A5544]/60 text-[#F8EDEB] font-semibold px-6 py-3 rounded-xl hover:bg-[#3A5544]/80 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#442D1C]/60 hover:border-[#442D1C]/80 backdrop-blur-sm"
            >
              <span className="relative z-10">Cancelar</span>
              <div className="absolute inset-0 rounded-xl border border-[#F8EDEB]/20"></div>
            </button>
          </div>
        </div>

        {/* Efeito de brilho sutil */}
        <div className="absolute top-1/4 -left-10 w-32 h-32 bg-[#DE9B72]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-32 h-32 bg-[#DE9B72]/5 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
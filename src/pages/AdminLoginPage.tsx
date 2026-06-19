import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cornerImage from "../assets/img/cornerImage.svg";
import velaImage from "../assets/img/velap.png"; 
import { supabase } from "../config/supabase";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const { data: couple, error } = await supabase
        .from('vw_couples')
        .select('*')
        .eq('access_token', token.trim().toUpperCase())
        .maybeSingle();

      if (error) throw error;

      if (!couple) {
        setErrorMsg("Token inválido. Verifique o código de acesso.");
        return;
      }

      localStorage.setItem('casamento_role', 'admin');
      localStorage.setItem('couple_id', couple.id);
      localStorage.setItem('couple_names', couple.names);

      navigate("/painel");

    } catch (err) {
      console.error("Erro no login:", err);
      setErrorMsg("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#1a0e08]">
      
      {/* CAMADA 1: Fundo com textura vintage e vela */}
      <div className="absolute inset-0 z-0">
        <img 
          src={velaImage} 
          alt="Luz de velas" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e08] via-[#2e170e]/90 to-[#3d2015]/80"></div>
      </div>

      {/* Textura de papel antigo */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>

      {/* Textura de grão vintage */}
      <div 
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>

      {/* CAMADA 2: Efeito de luz de vela - REDUZIDO */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <div 
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-20 blur-[80px] sm:blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,150,0.6) 0%, rgba(222,155,114,0.3) 40%, transparent 70%)',
            animation: 'flicker 5s infinite alternate ease-in-out'
          }}
        ></div>
      </div>

      {/* CAMADA 3: Caixa de Login - COMPACTA E CENTRALIZADA */}
      <div className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] bg-gradient-to-br from-[#DE9B72]/10 to-[#DE9B72]/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-sm animate-in fade-in zoom-in duration-700">
        
        {/* Moldura externa */}
        <div className="border-2 border-[#DE9B72]/40 rounded-xl p-2 bg-black/30 backdrop-blur-sm">
          
          {/* Moldura interna */}
          <div className="border-[2px] border-[#DE9B72]/50 rounded-lg p-1.5 bg-gradient-to-br from-[#DE9B72]/10 to-transparent">
            
            {/* Conteúdo principal - PADDING REDUZIDO */}
            <div 
              className="border border-[#DE9B72]/60 rounded-md p-5 sm:p-6 md:p-8 text-center relative overflow-hidden bg-gradient-to-br from-[#2a1610] to-[#1a0e08]"
              style={{ 
                backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')",
                backgroundBlendMode: "multiply"
              }}
            >
              
              {/* Cantos decorativos - MENORES */}
              <img src={cornerImage} className="absolute top-2 left-2 w-8 h-8 sm:w-10 sm:h-10 opacity-40" alt="corner" />
              <img src={cornerImage} className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 scale-x-[-1] opacity-40" alt="corner" />
              <img src={cornerImage} className="absolute bottom-2 left-2 w-8 h-8 sm:w-10 sm:h-10 scale-y-[-1] opacity-40" alt="corner" />
              <img src={cornerImage} className="absolute bottom-2 right-2 w-8 h-8 sm:w-10 sm:h-10 scale-[-1] opacity-40" alt="corner" />

              <div className="relative z-10">
                {/* Selo/emblema - MAIS COMPACTO */}
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 border border-[#DE9B72]/30 rounded-full bg-[#DE9B72]/5">
                  <span className="text-[#DE9B72]/60 text-[7px] sm:text-[8px] font-sans tracking-[0.2em] uppercase">✦ Convite Especial ✦</span>
                </div>

                {/* Título - MENOR */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic mb-2 text-[#f9e4b7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] tracking-wider">
                  Acesso dos Noivos
                </h2>
                
                {/* Linha decorativa - MAIS CURTA */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5 opacity-60">
                  <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#DE9B72] to-transparent"></div>
                  <span className="text-[#DE9B72] text-[10px] sm:text-xs">✦</span>
                  <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent via-[#DE9B72] to-transparent"></div>
                </div>

                {/* Nomes dos noivos - MAIS COMPACTO */}
                <div className="relative inline-block mb-4 sm:mb-5">
                  <p className="text-[#DE9B72] font-texts text-base sm:text-lg md:text-xl tracking-[0.15em] opacity-80">
                    Milene & Gabriel
                  </p>
                  <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DE9B72]/30 to-transparent"></div>
                </div>

                {/* Campo de input - MAIS COMPACTO */}
                <div className="relative group mb-4 sm:mb-5 w-full max-w-[260px] sm:max-w-xs mx-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DE9B72]/20 to-[#DE9B72]/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <input
                    type="password"
                    placeholder="CHAVE DE ACESSO"
                    value={token}
                    onChange={(e) => setToken(e.target.value.toUpperCase())}
                    className="relative w-full px-4 py-3 sm:py-3.5 rounded-lg border border-[#DE9B72]/30 bg-black/40 text-[#f9e4b7] placeholder-[#DE9B72]/30 focus:outline-none focus:border-[#DE9B72]/60 focus:bg-black/60 text-center tracking-[0.3em] text-xs sm:text-sm shadow-inner transition-all duration-300"
                  />
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#DE9B72]/30 group-focus-within:text-[#DE9B72]/60 transition-colors">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                {/* Mensagem de erro - MAIS COMPACTA */}
                {errorMsg && (
                  <div className="relative mb-4 sm:mb-5 w-full max-w-[260px] sm:max-w-xs mx-auto">
                    <div className="absolute inset-0 bg-red-950/40 blur-sm"></div>
                    <div className="relative bg-red-950/30 border border-red-500/30 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm">
                      <p className="text-red-200/90 text-[10px] sm:text-xs font-sans tracking-wide flex items-center justify-center gap-2">
                        <span className="text-red-400">✦</span>
                        {errorMsg}
                        <span className="text-red-400">✦</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Botão de login - MAIS COMPACTO */}
                <button
                  onClick={handleLogin}
                  disabled={loading || !token.trim()}
                  className="relative w-full max-w-[260px] sm:max-w-xs mx-auto group overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DE9B72]/20 to-[#DE9B72]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  <div className="relative bg-gradient-to-r from-[#4d6648] to-[#2e170eff] text-[#f9e4b7] font-sans font-bold px-5 py-3 sm:py-3.5 rounded-lg border border-[#DE9B72]/30 disabled:opacity-50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(222,155,114,0.15)] transition-all duration-300 uppercase tracking-widest text-[10px] sm:text-xs">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Desbloqueando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>✦</span>
                        Entrar no Painel
                        <span>✦</span>
                      </span>
                    )}
                  </div>
                </button>
                
                {/* Link de voltar - MAIS COMPACTO */}
                <button 
                  onClick={() => navigate("/")}
                  className="mt-5 sm:mt-6 text-[#DE9B72]/40 hover:text-[#DE9B72]/70 text-[8px] sm:text-[10px] font-sans tracking-[0.15em] uppercase transition-all duration-300 group"
                >
                  <span className="relative">
                    Retornar ao Convite
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#DE9B72]/30 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>

                {/* Assinatura vintage - MAIS COMPACTA */}
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-[#DE9B72]/10 w-full max-w-[260px] sm:max-w-xs mx-auto">
                  <p className="text-[#DE9B72]/20 text-[5px] sm:text-[7px] font-sans tracking-[0.2em] uppercase">
                    ⋆⋅☆⋅⋆ Um momento para ser guardado com carinho ⋆⋅☆⋅⋆
                  </p>
                </div>
              </div>

              {/* Efeito de vinheta */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-black/20"></div>
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.3)_100%)]"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { 
            opacity: 0.15; 
            transform: scale(0.95) rotate(-2deg); 
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.05) rotate(1deg); 
          }
          75% { 
            opacity: 0.2; 
            transform: scale(1) rotate(-1deg); 
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation: fadeIn 0.7s ease-out forwards;
        }

        input::placeholder {
          color: rgba(222, 155, 114, 0.3);
          letter-spacing: 0.3em;
        }
      `}</style>
    </div>
  );
}
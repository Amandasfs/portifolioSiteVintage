import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InvitePage from "./pages/InvitePage";
import DashboardPage from "./pages/DashboardPage";
import PresentsPage from "./pages/PresentsPage";
import AdminLoginPage from "./pages/AdminLoginPage"; // <-- Importe a nova tela

// Componente para proteger rotas dos noivos
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { if (active) setAllowed(false); return; }
      const { data, error } = await supabase.rpc('get_letter_admin_couple').single<{ id: string; names: string }>();
      if (!active) return;
      if (error || !data) { setAllowed(false); return; }
      localStorage.setItem('casamento_role', 'admin');
      localStorage.setItem('couple_id', data.id);
      localStorage.setItem('couple_names', data.names);
      setAllowed(true);
    };
    void check().catch(() => { if (active) setAllowed(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && active) setAllowed(false);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  if (allowed === null) return <p>Carregando painel...</p>;
  if (!allowed) return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal: Tela do Convite */}
        <Route path="/" element={<InvitePage />} />
        
        {/* Rota de Presentes */}
        <Route path="/presentes" element={<PresentsPage />} />

        {/* Rota de Login dos Noivos */}
        <Route path="/admin" element={<AdminLoginPage />} />

        {/* Rota do Painel dos Noivos PROTEGIDA */}
        <Route 
          path="/painel" 
          element={
            <ProtectedAdminRoute>
              <DashboardPage />
            </ProtectedAdminRoute>
          } 
        />

        {/* Rota de Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
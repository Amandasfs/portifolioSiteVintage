import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InvitePage from "./pages/InvitePage";
import DashboardPage from "./pages/DashboardPage";
import PresentsPage from "./pages/PresentsPage";
import AdminLoginPage from "./pages/AdminLoginPage"; // <-- Importe a nova tela

// Componente para proteger rotas dos noivos
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem('casamento_role');
  if (role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }
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
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto a verificação inicial da sessão está acontecendo, não renderize nada
  if (loading) {
    return <div>Carregando...</div>; // Ou um componente de Spinner/Loading
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho (a página protegida)
  return children;
}

export default ProtectedRoute;

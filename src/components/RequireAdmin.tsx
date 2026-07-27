import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

/**
 * Guard de rota: só renderiza os filhos se houver sessão de admin ativa;
 * caso contrário, redireciona para /login.
 */
const RequireAdmin = ({ children }: { children: ReactNode }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAdmin;

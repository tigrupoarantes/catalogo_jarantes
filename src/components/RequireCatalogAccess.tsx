import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isCatalogAuthenticated } from "@/lib/catalogAuth";

/**
 * Guard de rota do catálogo público: sem sessão ativa, redireciona para
 * /acesso (lembrando a página de origem para voltar após o login).
 */
const RequireCatalogAccess = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (!isCatalogAuthenticated()) {
    return <Navigate to="/acesso" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default RequireCatalogAccess;

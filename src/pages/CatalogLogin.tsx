import { useState, FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isCatalogAuthenticated, loginCatalog } from "@/lib/catalogAuth";

const inputClass =
  "pl-11 h-11 bg-white border-none rounded-xl font-bold text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all focus-visible:ring-2 focus-visible:ring-primary";

const CatalogLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/";

  if (isCatalogAuthenticated()) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginCatalog(user, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Usuário ou senha inválidos.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-in fade-in-0 duration-300">
        {/* Identidade visual — mesmo bloco do topo do catálogo */}
        <div className="w-full max-w-[240px] flex flex-col items-center gap-3">
          <img
            src="/J.ARANTES.png"
            alt="J. Arantes Distribuição"
            className="w-[80%] object-contain"
          />
          <div className="w-full h-10 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.03)] select-none">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800 text-center">
              Catálogo Digital
            </span>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-slate-100/40 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)] bg-white">
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-xl font-extrabold text-slate-800">Bem-vindo</h1>
            <p className="text-xs text-slate-500">
              Entre com seu usuário e senha para acessar o catálogo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="catalog-user" className="text-sm font-bold text-slate-800 block pl-1">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="catalog-user"
                  type="text"
                  autoComplete="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className={inputClass}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="catalog-password" className="text-sm font-bold text-slate-800 block pl-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="catalog-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs font-bold text-[#E31B23] text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-[#1e1f1f] hover:bg-black text-white h-11 rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.16)] transition-all duration-300"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
          Grupo Arantes · Uso restrito
        </p>
      </div>
    </div>
  );
};

export default CatalogLogin;

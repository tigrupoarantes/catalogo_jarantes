/**
 * Autenticação simples de admin (gate de acesso casual — NÃO é segurança forte).
 *
 * ⚠️ Como é uma SPA, estas credenciais ficam visíveis no bundle do cliente e as
 * gravações usam a chave pública do Supabase. Isto impede acesso casual à área
 * administrativa, mas a proteção real das gravações depende de RLS no Supabase.
 *
 * As credenciais podem ser sobrescritas por env (`VITE_ADMIN_USER` /
 * `VITE_ADMIN_PASSWORD`); caso não definidas, usa o fallback padrão.
 */

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "j.arantes";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "ga@2026";

const AUTH_KEY = "ja_admin_auth";

/** Valida as credenciais; em sucesso persiste a sessão e retorna true. */
export function login(user: string, password: string): boolean {
  const ok = user.trim() === ADMIN_USER && password === ADMIN_PASSWORD;
  if (ok) {
    localStorage.setItem(AUTH_KEY, "1");
  }
  return ok;
}

/** true se há uma sessão de admin ativa neste dispositivo. */
export function isAdminAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

/** Encerra a sessão de admin. */
export function logoutAdmin(): void {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * Acesso ao catálogo público (separado do login de admin em adminAuth.ts).
 *
 * As credenciais são validadas no servidor (`POST /api/catalog-login`, env
 * CATALOG_USER / CATALOG_PASSWORD) para não ficarem expostas no bundle. A sessão
 * fica neste dispositivo por SESSION_DAYS dias.
 *
 * ⚠️ É um gate de acesso casual: os dados de produto continuam vindo do Supabase
 * com a chave pública.
 */

const AUTH_KEY = "ja_catalog_auth";
const SESSION_DAYS = 30;

/** Valida as credenciais no servidor; em sucesso persiste a sessão. Lança Error com a mensagem em caso de falha. */
export async function loginCatalog(user: string, password: string): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/catalog-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
  } catch {
    throw new Error("Não foi possível conectar. Verifique sua internet e tente novamente.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "Usuário ou senha inválidos.");
  }
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  try {
    localStorage.setItem(AUTH_KEY, String(expiresAt));
  } catch {
    /* storage bloqueado: segue sem persistir */
  }
}

/** true se há uma sessão do catálogo válida neste dispositivo. */
export function isCatalogAuthenticated(): boolean {
  try {
    const expiresAt = Number(localStorage.getItem(AUTH_KEY));
    return Number.isFinite(expiresAt) && expiresAt > Date.now();
  } catch {
    return false;
  }
}

/** Encerra a sessão do catálogo. */
export function logoutCatalog(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

const STORAGE_BASE = import.meta.env.VITE_SUPABASE_URL || "https://bzdpgsfmbbhpqbyugrmg.supabase.co";
const STORAGE_URL = `${STORAGE_BASE}/storage/v1/object/public/product-images`;

/**
 * Resolves a product image URL. If it points to a local route starting with /uploads/produtos/,
 * it dynamically converts it to a Supabase public Storage URL while keeping the file extension.
 */
export const resolveProductImageUrl = (imageUrl: string | null | undefined, code: string): string => {
  const normalizedCode = String(code || "").trim();

  if (!imageUrl) {
    return `${STORAGE_URL}/${normalizedCode}.png`;
  }

  if (imageUrl.startsWith("/uploads/produtos/")) {
    const extMatch = imageUrl.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : "png";
    return `${STORAGE_URL}/${normalizedCode}.${ext}`;
  }

  if (imageUrl.includes("/storage/v1/object/public/product-images/")) {
    const pathMatch = imageUrl.match(/\/product-images\/([^?#]+)/);
    const imageName = pathMatch?.[1];
    const extMatch = imageUrl.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
    const ext = extMatch ? extMatch[1] : "png";

    if (imageName && imageName.startsWith(`${normalizedCode}.`)) {
      return imageUrl;
    }

    return `${STORAGE_URL}/${normalizedCode}.${ext}`;
  }

  return imageUrl;
};

export type DerivativeSize = "thumb" | "card" | "full";

// Extensão de cada derivado (deve bater com src/utils/imageDerivatives.ts e o backfill).
const DERIVATIVE_EXT: Record<DerivativeSize, string> = {
  thumb: "webp",
  card: "webp",
  full: "jpg",
};

/**
 * URL ESTÁTICA do derivado pré-gerado ({code}_thumb.webp, {code}_card.webp, {code}_full.jpg).
 * Não usa o endpoint /render/image/ (que é cobrado por transformação). Servido como
 * arquivo normal via /object/public/. O consumidor deve ter fallback (onError) para o
 * original, pois um produto pode ainda não ter derivados durante a transição/backfill.
 */
export const getDerivativeUrl = (
  code: string | null | undefined,
  size: DerivativeSize
): string => {
  const normalizedCode = String(code || "").trim();
  if (!normalizedCode) return "";
  return `${STORAGE_URL}/${normalizedCode}_${size}.${DERIVATIVE_EXT[size]}`;
};

/**
 * @deprecated Substituído por derivados estáticos (getDerivativeUrl). Mantido apenas
 * como no-op de compatibilidade: retorna a URL original SEM aplicar transform on-the-fly.
 */
export const getOptimizedUrl = (url: string | null | undefined, _width = 300) => {
  return url || "";
};

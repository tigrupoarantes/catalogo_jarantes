const STORAGE_BASE = import.meta.env.VITE_SUPABASE_URL || "https://bzdpgsfmbbhpqbyugrmg.supabase.co";
const STORAGE_URL = `${STORAGE_BASE}/storage/v1/object/public/product-images`;

/**
 * Resolves a product image URL. If it points to a local route starting with /uploads/produtos/,
 * it dynamically converts it to a Supabase public Storage URL while keeping the file extension.
 */
export const resolveProductImageUrl = (imageUrl: string | null | undefined, code: string): string => {
  if (!imageUrl) {
    return `${STORAGE_URL}/${code}.png`;
  }
  
  if (imageUrl.startsWith("/uploads/produtos/")) {
    const extMatch = imageUrl.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : "png";
    return `${STORAGE_URL}/${code}.${ext}`;
  }
  
  return imageUrl;
};

/**
 * Returns a Supabase optimized image transformation URL for thumbnails.
 */
export const getOptimizedUrl = (url: string | null | undefined, width = 300) => {
  if (!url) return "";
  if (url.includes("supabase.co/storage/v1/object/public/")) {
    return url.replace("/object/public/", "/render/image/public/") + `?width=${width}&height=${width}&resize=contain`;
  }
  return url;
};

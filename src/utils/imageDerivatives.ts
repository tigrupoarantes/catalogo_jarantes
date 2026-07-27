/**
 * Geração de derivados de imagem no navegador (via Canvas), para evitar o
 * endpoint de transformação on-the-fly do Supabase (que é cobrado por imagem
 * de origem transformada por ciclo). Os derivados são salvos como arquivos
 * estáticos no bucket e servidos com getPublicUrl() sem transform.
 *
 * Convenção de nomes (flat, ao lado do original {code}.{ext}):
 *   {code}_thumb.webp  (200px, webp)
 *   {code}_card.webp   (600px, webp)
 *   {code}_full.jpg    (1600px, jpeg — compatível com InDesign no export)
 */

export type DerivativeSize = "thumb" | "card" | "full";

export interface DerivativeSpec {
  size: DerivativeSize;
  maxDimension: number;
  mime: "image/webp" | "image/jpeg";
  ext: "webp" | "jpg";
  quality: number;
}

export const DERIVATIVE_SPECS: DerivativeSpec[] = [
  { size: "thumb", maxDimension: 200, mime: "image/webp", ext: "webp", quality: 0.8 },
  { size: "card", maxDimension: 600, mime: "image/webp", ext: "webp", quality: 0.8 },
  { size: "full", maxDimension: 1600, mime: "image/jpeg", ext: "jpg", quality: 0.85 },
];

/** Nome de arquivo do derivado no bucket, ex.: "411201_card.webp". */
export function derivativeFileName(code: string, spec: DerivativeSpec): string {
  return `${String(code).trim()}_${spec.size}.${spec.ext}`;
}

export interface GeneratedDerivative {
  spec: DerivativeSpec;
  fileName: string;
  blob: Blob;
}

/**
 * Carrega o File em um bitmap (preferindo createImageBitmap por performance,
 * com fallback para HTMLImageElement + object URL).
 */
async function loadBitmap(file: File): Promise<{
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  width: number;
  height: number;
  cleanup: () => void;
}> {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);
    return {
      draw: (ctx, w, h) => ctx.drawImage(bitmap, 0, 0, w, h),
      width: bitmap.width,
      height: bitmap.height,
      cleanup: () => bitmap.close(),
    };
  }

  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Falha ao carregar a imagem para redimensionamento."));
    img.src = url;
  });
  return {
    draw: (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h),
    width: img.naturalWidth,
    height: img.naturalHeight,
    cleanup: () => URL.revokeObjectURL(url),
  };
}

/** Calcula dimensões "contain": encaixa dentro de max x max preservando aspecto (sem upscaling). */
function containDimensions(w: number, h: number, max: number): { width: number; height: number } {
  if (w <= 0 || h <= 0) return { width: max, height: max };
  const scale = Math.min(1, max / Math.max(w, h));
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error(`Falha ao gerar blob (${mime}).`))),
      mime,
      quality
    );
  });
}

/**
 * Gera os 3 derivados (thumb/card/full) a partir de um File de imagem.
 * Roda inteiramente no navegador. Lança se o ambiente não suportar canvas.
 */
export async function generateDerivatives(
  file: File,
  code: string
): Promise<GeneratedDerivative[]> {
  const source = await loadBitmap(file);
  try {
    const results: GeneratedDerivative[] = [];
    for (const spec of DERIVATIVE_SPECS) {
      const { width, height } = containDimensions(source.width, source.height, spec.maxDimension);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context indisponível.");
      // JPEG não tem alpha: fundo branco para evitar transparência preta.
      if (spec.mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      source.draw(ctx, width, height);
      const blob = await canvasToBlob(canvas, spec.mime, spec.quality);
      results.push({ spec, fileName: derivativeFileName(code, spec), blob });
    }
    return results;
  } finally {
    source.cleanup();
  }
}

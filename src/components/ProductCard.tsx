import { useState } from "react";
import { Product, parseProductTechnicalData } from "@/data/products";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { ExportConfig } from "@/utils/exportConstants";

const STORAGE_BASE = import.meta.env.VITE_SUPABASE_URL;
const STORAGE_URL = `${STORAGE_BASE}/storage/v1/object/public/product-images`;

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  config?: ExportConfig;
}

const getOptimizedUrl = (url: string | null | undefined, width = 300) => {
  if (!url) return "";
  if (url.includes("supabase.co/storage/v1/object/public/")) {
    return url.replace("/object/public/", "/render/image/public/") + `?width=${width}&height=${width}&resize=contain`;
  }
  return url;
};

const ProductCard = ({ product, priority = false, config }: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Use the pre-mapped local image URL if it exists (Optimized thumbnail for grid)
  const thumbnailUrl = getOptimizedUrl(product.imageUrl || `${STORAGE_URL}/${product.code}.png`, 300);
  
  // Keep original untouched high-resolution image for zoom/lightbox and print/export
  const fullImageUrl = product.imageUrl || `${STORAGE_URL}/${product.code}.png`;

  // Default config if not provided (showing everything)
  const displayConfig = config || {
    showBrand: true,
    showCategory: true,
    showName: true,
    showCode: true,
    showBox: true,
    showEan: true,
    showNcm: true,
    showDun: true,
  };

  // Parse combined EAN column data
  const techData = parseProductTechnicalData(product);

  // Helper dynamic description wrap at 2 words per line
  const formatDescription = (name: string) => {
    const words = name.split(/\s+/).filter(w => w.length > 0);
    const lines: string[][] = [];
    for (let i = 0; i < words.length; i += 2) {
      lines.push(words.slice(i, i + 2));
    }
    return (
      <div className="flex flex-col items-center justify-center h-full w-full min-w-0">
        {lines.slice(0, 3).map((line, idx) => (
          <span key={idx} className="block truncate w-full text-center">
            {line.join(" ")}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl p-3 flex flex-col font-sans shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] group h-[480px] justify-between">
        {/* Área da Imagem */}
        <div 
          className="h-[180px] w-full flex items-center justify-center cursor-pointer overflow-hidden bg-white rounded-lg mb-2 relative"
          onClick={() => !imgError && setLightboxOpen(true)}
        >
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-[#426EA8] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full z-10 uppercase tracking-wide shadow-[0_2px_8px_rgba(66,110,168,0.35)] select-none">
              Novo
            </div>
          )}
          {!imgError ? (
            <img
              src={thumbnailUrl}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading={priority ? "eager" : "lazy"}
              {...(priority ? { "fetchpriority": "high" } : {})}
            />
          ) : (
            <span className="text-xl font-bold text-[#242525]/20">{product.name.charAt(0)}</span>
          )}
        </div>

        {/* Área de Textos Metadados (Top-to-Bottom: Categoria -> Subcategoria -> Descrição) */}
        <div className="flex flex-col items-center justify-center gap-1.5 mb-2">
          {/* Categoria (Mapeado de brand) */}
          {displayConfig.showBrand && (
            <div className="text-[#242525] font-bold text-[9px] uppercase tracking-widest text-center">
              {product.brand}
            </div>
          )}
          
          {/* Subcategoria (Mapeado de category) */}
          {displayConfig.showCategory && (
            <div className="text-[#474747] font-semibold text-[8px] uppercase line-clamp-1 text-center">
              {product.category}
            </div>
          )}

          {/* Descrição do Produto (Mapeado de name) */}
          {displayConfig.showName && (
            <div className="text-center text-[#242525] font-extrabold text-[13px] leading-[1.2] h-[52px] overflow-hidden uppercase mt-1 w-full px-4">
              {formatDescription(product.name)}
            </div>
          )}
        </div>

        {/* Tabela de Dados (Estilo Pílula) */}
        <div className="flex flex-col gap-[5px] w-full mt-auto">
          {/* Linha Cód */}
          {displayConfig.showCode && (
            <div className="flex gap-1.5 w-full h-[22px]">
              <div className="w-[30%] border border-[#8E8E93] text-[#474747] rounded-full flex items-center justify-center font-bold text-[9px] bg-transparent">
                Cód.
              </div>
              <div className="w-[70%] border border-[#242525] text-[#474747] rounded-full flex items-center pl-3 font-bold text-[10px] bg-transparent">
                {product.code}
              </div>
            </div>
          )}

          {/* Linha Caixa */}
          {displayConfig.showBox && (
            <div className="flex gap-1.5 w-full h-[22px]">
              <div className="w-[30%] border border-[#8E8E93] text-[#474747] rounded-full flex items-center justify-center font-bold text-[9px] bg-transparent">
                Caixa
              </div>
              <div className="w-[70%] border border-[#242525] text-[#474747] rounded-full flex items-center pl-3 font-bold text-[10px] bg-transparent">
                {product.packSize}
              </div>
            </div>
          )}

          {/* Linha Class. Fiscal (NCM) */}
          {(displayConfig.showNcm || config?.showNcm === undefined) && (
            <div className="flex gap-1.5 w-full h-[22px]">
              <div className="w-[30%] border border-[#8E8E93] text-[#474747] rounded-full flex items-center justify-center font-bold text-[9px] bg-transparent tracking-tighter">
                Class. Fisc.
              </div>
              <div className="w-[70%] border border-[#242525] text-[#474747] rounded-full flex items-center pl-3 font-bold text-[10px] bg-transparent tracking-tight">
                {techData.ncm || "N/A"}
              </div>
            </div>
          )}

          {/* Linha EAN */}
          {displayConfig.showEan && (
            <div className="flex gap-1.5 w-full h-[22px]">
              <div className="w-[30%] border border-[#8E8E93] text-[#474747] rounded-full flex items-center justify-center font-bold text-[9px] bg-transparent">
                EAN
              </div>
              <div className="w-[70%] border border-[#242525] text-[#474747] rounded-full flex items-center pl-3 font-bold text-[10px] bg-transparent tracking-tight">
                {techData.ean || "N/A"}
              </div>
            </div>
          )}

          {/* Linha DUN */}
          {displayConfig.showDun && (
            <div className="flex gap-1.5 w-full h-[22px]">
              <div className="w-[30%] border border-[#8E8E93] text-[#474747] rounded-full flex items-center justify-center font-bold text-[9px] bg-transparent">
                DUN
              </div>
              <div className="w-[70%] border border-[#242525] text-[#474747] rounded-full flex items-center pl-3 font-bold text-[10px] bg-transparent tracking-tight">
                {techData.dun || "N/A"}
              </div>
            </div>
          )}
        </div>
      </div>


      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 sm:p-4 flex items-center justify-center bg-black/95 border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Visualização do Produto: {product.name}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full overflow-auto flex items-center justify-center">
            <img
              src={fullImageUrl}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain cursor-zoom-in hover:scale-150 transition-transform duration-300 origin-center"
              style={{ touchAction: "pinch-zoom" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;

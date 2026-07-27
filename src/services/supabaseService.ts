import { supabase } from '../integrations/supabase/client';
import { Product } from '../data/products';
import { generateDerivatives } from '../utils/imageDerivatives';

const PRODUCTS_TABLE = 'products_v2';
const IMAGES_BUCKET = 'product-images';

export const supabaseService = {
  async getProducts(): Promise<(Product & { id: string })[]> {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*');
      
    if (error) {
      console.error("Error fetching from Supabase:", error);
      throw error;
    }
    
    return (data || []).map(fp => {
      const parts = (fp.ean || "").split("|");
      return {
        ...fp,
        isNew: parts[3] === "true" || !!fp.isNew
      };
    }) as (Product & { id: string })[];
  },

  async addProduct(product: Omit<Product, 'id'>) {
    const productWithId = {
      ...product,
      id: product.code // Use code as primary key ID
    };
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .insert([productWithId])
      .select()
      .single();
      
    if (error) {
       console.error("Error adding product:", error);
       throw error;
    }
    return data;
  },

  async updateProduct(id: string, product: Partial<Product>) {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .update(product)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    return data;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
    return true;
  },

  async syncInitialData(initialProducts: Product[], options?: { deleteMissing?: boolean }) {
    console.log(`Checking ${initialProducts.length} products to sync...`);
    
    // Fetch all existing products to map by code
    const { data: existingData, error: fetchError } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*');
      
    if (fetchError) {
      console.error("Error fetching existing products:", fetchError);
      throw fetchError;
    }

    type ProductRow = Product & { id: string };
    const existingProductsMap = new Map<string, ProductRow>();
    (existingData || []).forEach(doc => {
      existingProductsMap.set(doc.code, doc as ProductRow);
    });

    const toInsert: ProductRow[] = [];
    const toUpdate: ProductRow[] = [];

    for (const product of initialProducts) {
      const existing = existingProductsMap.get(product.code);
      
      if (!existing) {
        toInsert.push({
          ...product,
          id: product.code
        });
      } else {
        const updatedImageUrl = product.imageUrl || existing.imageUrl;
        toUpdate.push({
          ...product,
          id: existing.id,
          imageUrl: updatedImageUrl
        });
      }
    }

    // Process Inserts
    if (toInsert.length > 0) {
      const BATCH_SIZE = 500;
      for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
        const chunk = toInsert.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from(PRODUCTS_TABLE).insert(chunk);
        if (error) {
          console.error("Error inserting chunk:", error);
          throw error;
        }
      }
    }

    // Process Updates (Supabase upsert by ID)
    if (toUpdate.length > 0) {
      const BATCH_SIZE = 500;
      for (let i = 0; i < toUpdate.length; i += BATCH_SIZE) {
        const chunk = toUpdate.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from(PRODUCTS_TABLE).upsert(chunk);
        if (error) {
          console.error("Error updating chunk:", error);
          throw error;
        }
      }
    }

    // Modo "substituir tudo": remove os produtos cujo código NÃO está na planilha.
    // Destrutivo — só executa quando explicitamente solicitado (deleteMissing).
    let deleted = 0;
    if (options?.deleteMissing) {
      const incomingCodes = new Set(initialProducts.map(p => String(p.code)));
      const idsToDelete = (existingData || [])
        .filter(row => !incomingCodes.has(String(row.code)))
        .map(row => row.id);

      const BATCH_SIZE = 500;
      for (let i = 0; i < idsToDelete.length; i += BATCH_SIZE) {
        const chunk = idsToDelete.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from(PRODUCTS_TABLE).delete().in('id', chunk);
        if (error) {
          console.error("Error deleting missing products:", error);
          throw error;
        }
      }
      deleted = idsToDelete.length;
    }

    console.log('Sync complete.');
    return { inserted: toInsert.length, updated: toUpdate.length, deleted };
  },

  async uploadProductImage(code: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const filePath = `${code}.${fileExt}`;

    const { error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) {
      console.error("Error uploading image to Supabase:", error);
      throw error;
    }

    // Gera e sobe os derivados estáticos (thumb/card/full) para evitar o
    // transform on-the-fly cobrado do Supabase. Falha aqui NÃO aborta o upload
    // do original — o frontend cai no fallback ao original via onError.
    await this.uploadImageDerivatives(code, file);

    const { data: publicUrlData } = supabase.storage
      .from(IMAGES_BUCKET)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  /** Gera os derivados no browser e faz upload de cada um (best-effort). */
  async uploadImageDerivatives(code: string, file: File): Promise<void> {
    try {
      const derivatives = await generateDerivatives(file, code);
      await Promise.all(
        derivatives.map(async (d) => {
          const { error } = await supabase.storage
            .from(IMAGES_BUCKET)
            .upload(d.fileName, d.blob, {
              upsert: true,
              cacheControl: '3600',
              contentType: d.spec.mime,
            });
          if (error) {
            console.error(`Erro ao subir derivado ${d.fileName}:`, error);
          }
        })
      );
    } catch (err) {
      console.error(`Falha ao gerar derivados para ${code} (original mantido):`, err);
    }
  }
};

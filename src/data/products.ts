export interface Product {
  code: string;
  name: string;
  brand: string;
  category: string;
  packSize: string;
  ean: string;
  imageUrl?: string | null;
}

export const products: Product[] = [];
export const allCategories: string[] = [];
export const allBrands: string[] = [];

import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp,
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../data/products';

const PRODUCTS_COLLECTION = 'products_v2';

export const firebaseService = {
  async getProducts(): Promise<(Product & { id: string })[]> {
    const q = query(collection(db, PRODUCTS_COLLECTION));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (Product & { id: string })[];
  },

  async addProduct(product: Omit<Product, 'id'>) {
    return await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      updatedAt: serverTimestamp()
    });
  },

  async updateProduct(id: string, product: Partial<Product>) {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    return await updateDoc(productRef, {
      ...product,
      updatedAt: serverTimestamp()
    });
  },

  async deleteProduct(id: string) {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    return await deleteDoc(productRef);
  },

  async syncInitialData(initialProducts: Product[]) {
    // Check current products in Firestore
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const existingProductsMap = new Map<string, Product & { id: string }>();
    snapshot.docs.forEach(doc => {
      const data = doc.data() as Product;
      existingProductsMap.set(data.code, { id: doc.id, ...data });
    });
    
    // Firestore batch limit is 500 operations
    const BATCH_SIZE = 500;
    let currentBatch = writeBatch(db);
    let operationCount = 0;
    
    const commitBatchIfNeeded = async () => {
      if (operationCount >= BATCH_SIZE) {
        await currentBatch.commit();
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    };
    
    console.log(`Checking ${initialProducts.length} products to sync...`);
    
    for (const product of initialProducts) {
      const existing = existingProductsMap.get(product.code);
      
      if (!existing) {
        // Add new product
        const newDocRef = doc(collection(db, PRODUCTS_COLLECTION));
        currentBatch.set(newDocRef, {
          ...product,
          updatedAt: serverTimestamp()
        });
        operationCount++;
      } else {
        // Update existing product
        const updatedImageUrl = product.imageUrl || existing.imageUrl;
        
        // Check if there are changes before updating (optional optimization)
        const docRef = doc(db, PRODUCTS_COLLECTION, existing.id);
        currentBatch.update(docRef, {
          ...product,
          imageUrl: updatedImageUrl,
          updatedAt: serverTimestamp()
        });
        operationCount++;
      }
      
      await commitBatchIfNeeded();
    }
    
    if (operationCount > 0) {
      await currentBatch.commit();
      console.log(`Committed final batch operations.`);
    }
    
    console.log('Sync complete.');
  }
};

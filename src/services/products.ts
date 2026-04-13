import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  description?: string;
}

export const ProductService = {
  // Получить все товары
  async getAllProducts(): Promise<Product[]> {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Получить новинки
  async getNewProducts(): Promise<Product[]> {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('isNew', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Добавить товар (для админа)
  async addProduct(product: Product) {
    const productsRef = collection(db, 'products');
    return await addDoc(productsRef, product);
  },

  // Обновить товар
  async updateProduct(id: string, product: Partial<Product>) {
    const productRef = doc(db, 'products', id);
    return await updateDoc(productRef, product);
  },

  // Удалить товар
  async deleteProduct(id: string) {
    const productRef = doc(db, 'products', id);
    return await deleteDoc(productRef);
  }
};

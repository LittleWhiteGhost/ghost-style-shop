import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Order {
  id?: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    comment?: string;
  };
  createdAt: Timestamp;
}

export const OrderService = {
  // Создать заказ
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>) {
    const orderData = {
      ...order,
      status: 'pending' as const,
      createdAt: Timestamp.now()
    };
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return docRef.id;
  },

  // Получить заказы пользователя
  async getUserOrders(userId: string): Promise<Order[]> {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
};

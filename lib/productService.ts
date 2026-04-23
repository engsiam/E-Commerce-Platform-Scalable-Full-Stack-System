import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  deleteDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from '@/types';

const COLLECTION_NAME = 'products';

export async function fetchProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    let createdAt: string;
    if (data.createdAt instanceof Timestamp) {
      createdAt = data.createdAt.toDate().toISOString();
    } else if (typeof data.createdAt === 'string') {
      createdAt = data.createdAt;
    } else {
      createdAt = new Date().toISOString();
    }
    return {
      id: doc.id,
      ...data,
      createdAt,
    } as Product;
  });
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      title: product.title,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      price: Number(product.price) || 0,
      category: product.category,
      rating: Number(product.rating) || 0,
      imageUrl: product.imageUrl || '',
      tags: Array.isArray(product.tags) ? product.tags : [],
      createdAt: serverTimestamp(),
      addedBy: product.addedBy || '',
    });
    console.log('Product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log('Product deleted:', id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
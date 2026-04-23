import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  deleteDoc,
  updateDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from '@/types';

const COLLECTION_NAME = 'products';

export async function fetchProducts(): Promise<Product[]> {
  try {
    console.log('Fetching from collection:', COLLECTION_NAME);
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    console.log('Firebase docs count:', snapshot.size);
    console.log('Firebase docs:', snapshot.docs.map(d => ({ id: d.id, title: d.data().title })));
    
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
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
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

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
  try {
    const updateData: Record<string, unknown> = {};
    if (product.title !== undefined) updateData.title = product.title;
    if (product.shortDescription !== undefined) updateData.shortDescription = product.shortDescription;
    if (product.fullDescription !== undefined) updateData.fullDescription = product.fullDescription;
    if (product.price !== undefined) updateData.price = Number(product.price);
    if (product.category !== undefined) updateData.category = product.category;
    if (product.rating !== undefined) updateData.rating = Number(product.rating);
    if (product.imageUrl !== undefined) updateData.imageUrl = product.imageUrl;
    if (product.tags !== undefined) updateData.tags = Array.isArray(product.tags) ? product.tags : [];
    
    await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
    console.log('Product updated:', id);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}
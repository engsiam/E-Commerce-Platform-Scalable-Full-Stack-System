import { create } from 'zustand';
import type { ProductStore, Product } from '@/types';

export const useProductStore = create<ProductStore>()(
  (set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    addProduct: (product) =>
      set((state) => ({ products: [product, ...state.products] })),
    deleteProduct: (id) =>
      set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  })
);
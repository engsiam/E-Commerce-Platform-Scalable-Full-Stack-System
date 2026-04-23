'use client';

import { useProductStore } from '@/stores/productStore';
import { fetchProducts, addProduct as addProductToDb, deleteProduct as deleteProductFromDb, updateProduct as updateProductInDb } from '@/lib/productService';
import type { Product } from '@/types';
import { useEffect, useState, useCallback } from 'react';

export function useProducts() {
  const { products, setProducts, addProduct, deleteProduct } = useProductStore();
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      console.log('Fetched products from Firebase:', data);
      setProducts(data);
      console.log('Set products in store:', data.length);
    } catch (error) {
      console.error('Failed to refresh products:', error);
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const addProductHandler = async (product: Omit<Product, 'id'>): Promise<string> => {
    try {
      const id = await addProductToDb(product);
      await refreshProducts();
      console.log('Product added and list refreshed:', id);
      return id;
    } catch (error) {
      console.error('Error in addProductHandler:', error);
      throw error;
    }
  };

  const deleteProductHandler = async (id: string): Promise<void> => {
    try {
      await deleteProductFromDb(id);
      await refreshProducts();
      console.log('Product deleted and list refreshed:', id);
    } catch (error) {
      console.error('Error in deleteProductHandler:', error);
      throw error;
    }
  };

  const updateProductHandler = async (id: string, updates: Partial<Product>): Promise<void> => {
    try {
      await updateProductInDb(id, updates);
      await refreshProducts();
      console.log('Product updated and list refreshed:', id);
    } catch (error) {
      console.error('Error in updateProductHandler:', error);
      throw error;
    }
  };

  return {
    products,
    loading,
    addProduct: addProductHandler,
    deleteProduct: deleteProductHandler,
    updateProduct: updateProductHandler,
    refreshProducts,
  };
}
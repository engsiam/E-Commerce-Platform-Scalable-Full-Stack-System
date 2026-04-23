export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: 'clothing' | 'accessories' | 'home' | 'electronics' | 'beauty';
  rating: number;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  addedBy?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}
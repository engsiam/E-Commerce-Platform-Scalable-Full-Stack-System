'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';

interface RelatedProductsProps {
  category: Product['category'];
  excludeId: string;
}

export function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  const { products } = useProducts();
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = products
      .filter((p) => p.category === category && p.id !== excludeId)
      .slice(0, 3);
    setRelated(filtered);
  }, [products, category, excludeId]);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-brand-navy mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
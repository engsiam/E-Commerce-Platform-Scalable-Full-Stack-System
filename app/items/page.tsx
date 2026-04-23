'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { ProductFilters } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'home', label: 'Home' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'beauty', label: 'Beauty' },
];

export default function ItemsPage() {
  const { products, loading, refreshProducts } = useProducts();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
  });

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setFiltersOpen(true);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = !filters.category || p.category === filters.category;
      const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchRating = p.rating >= filters.minRating;
      return matchSearch && matchCategory && matchPrice && matchRating;
    });
  }, [products, filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 500,
      minRating: 0,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-2">
            Our Products
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-brand-slate">
              {filteredProducts.length} products found
            </p>
            <button
              onClick={() => refreshProducts()}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Refresh"
            >
              <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {filtersOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-64 flex-shrink-0"
            >
              <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-brand-navy">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-brand-amber hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-2 block">
                      Search
                    </label>
                    <Input
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      icon={<Search className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-2 block">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-2 block">
                      Price Range
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            minPrice: Number(e.target.value),
                          })
                        }
                        className="w-full"
                        placeholder="Min"
                      />
                      <span className="text-brand-slate">-</span>
                      <Input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            maxPrice: Number(e.target.value),
                          })
                        }
                        className="w-full"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-2 block">
                      Min Rating
                    </label>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setFilters({ ...filters, minRating: rating })
                          }
                          className={`flex-1 py-2 text-xs rounded-md border transition-colors ${
                            filters.minRating === rating
                              ? 'bg-brand-amber text-brand-navy border-brand-amber'
                              : 'bg-white text-brand-slate border-gray-200 hover:border-brand-amber'
                          }`}
                        >
                          {rating}+
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.aside>
          )}

          <motion.div
            variants={containerVariants}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brand-slate mb-4">
              No products match your filters.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
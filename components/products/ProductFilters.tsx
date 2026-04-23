'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { ProductFilters } from '@/types';
import { Input } from '@/components/ui/Input';

interface ProductFiltersProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'home', label: 'Home' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'beauty', label: 'Beauty' },
];

export function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 500,
      minRating: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-brand-navy">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-xs text-brand-amber hover:underline"
        >
          Reset
        </button>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-navy mb-2 block">Search</label>
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-brand-navy mb-2 block">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
        <label className="text-sm font-medium text-brand-navy mb-2 block">Price Range</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full"
            placeholder="Min"
          />
          <span className="text-brand-slate">-</span>
          <Input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-navy mb-2 block">Min Rating</label>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilters({ ...filters, minRating: rating })}
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
  );
}
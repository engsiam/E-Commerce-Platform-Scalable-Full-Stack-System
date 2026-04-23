'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Product } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const categories = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'home', label: 'Home' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'beauty', label: 'Beauty' },
];

export default function AddProductPage() {
  const { user, loading: authLoading } = useAuthStore();
  const { addProduct } = useProducts();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'clothing',
    price: '',
    rating: 4,
    imageUrl: '',
    tags: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full" />
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (form.shortDescription.length > 120) newErrors.shortDescription = 'Max 120 characters';
    if (!form.fullDescription.trim()) newErrors.fullDescription = 'Full description is required';
    if (!form.price || Number(form.price) < 0) newErrors.price = 'Price must be positive';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const tagsArray = form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0);

      const newProduct: Omit<Product, 'id'> = {
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        price: Number(form.price) || 0,
        category: form.category as Product['category'],
        rating: Number(form.rating) || 4,
        imageUrl: form.imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf31?w=600&q=80',
        tags: tagsArray,
        createdAt: new Date().toISOString(),
        addedBy: user.uid,
      };

      console.log('Submitting product:', newProduct);

      const productId = await addProduct(newProduct);
      console.log('Product created with ID:', productId);

      toast.success('Product added successfully!', {
        icon: '✅',
        style: {
          borderRadius: '8px',
          background: '#10b981',
          color: '#fff',
        },
      });
      
      router.push('/items/manage');
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product. Please try again.', {
        style: {
          borderRadius: '8px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-8">
          Add New Product
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
              required
            />

            <div>
              <Input
                label="Short Description"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                error={errors.shortDescription}
                required
              />
              <p className="text-xs text-brand-slate mt-1 text-right">
                {form.shortDescription.length}/120
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                Full Description
              </label>
              <textarea
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-amber resize-none"
                required
              />
              {errors.fullDescription && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullDescription}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price"
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              error={errors.price}
            />

            <div>
              <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      form.rating >= star
                        ? 'bg-brand-amber text-brand-navy border-brand-amber'
                        : 'bg-white text-brand-slate border-gray-200 hover:border-brand-amber'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Image URL (optional)"
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
            />

            {form.imageUrl && (
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <Input
              label="Tags (optional)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="wool, winter, warm"
            />
            <p className="text-xs text-brand-slate -mt-4">
              Separate tags with commas
            </p>

            <Button type="submit" loading={loading} className="w-full">
              Add Product
            </Button>
          </form>
        </Card>
      </div>
    </motion.div>
  );
}
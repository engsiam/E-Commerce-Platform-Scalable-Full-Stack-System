'use client';

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice, generateStars } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { RelatedProducts } from '@/components/products/RelatedProducts';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { products, loading } = useProducts();
  
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-slate mb-4">Product not found</p>
          <button
            onClick={() => router.push('/items')}
            className="text-brand-amber hover:underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stars = generateStars(product.rating);

  const specs = [
    { label: 'Category', value: product.category },
    { label: 'Price', value: formatPrice(product.price) },
    { label: 'Rating', value: `${product.rating}/5` },
    { label: 'Tags', value: product.tags.join(', ') || 'None' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-brand-slate hover:text-brand-navy mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-400"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="amber" className="capitalize">
                {product.category}
              </Badge>
              <div className="flex items-center gap-0.5">
                {[...Array(stars.full)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                ))}
                {stars.half && (
                  <Star className="w-4 h-4 fill-brand-amber text-brand-amber/50" />
                )}
                {[...Array(stars.empty)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-1 text-sm text-brand-slate">
                  {product.rating}
                </span>
              </div>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy">
              {product.title}
            </h1>

            <p className="text-3xl font-bold text-brand-amber">
              {formatPrice(product.price)}
            </p>

            <p className="text-brand-slate leading-relaxed">
              {product.fullDescription}
            </p>

            <Card className="p-6">
              <h3 className="font-semibold text-brand-navy mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs text-brand-slate uppercase tracking-wide">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium text-brand-navy capitalize">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <RelatedProducts
            category={product.category}
            excludeId={product.id}
          />
        </div>
      </div>
    </motion.div>
  );
}
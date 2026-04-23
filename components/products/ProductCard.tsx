'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, generateStars } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stars = generateStars(product.rating);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full"
    >
      <Link href={`/items/${product.id}`} className="group block h-full">
        
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
          
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="absolute top-3 left-3">
              <Badge variant="amber" className="capitalize">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            
            <h3 className="font-display text-lg font-semibold text-brand-navy mb-1 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-sm text-brand-slate line-clamp-2 mb-4">
              {product.shortDescription}
            </p>

            {/* Price + Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-brand-amber">
                {formatPrice(product.price)}
              </span>

              <div className="flex items-center gap-0.5">
                {[...Array(stars.full)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                ))}
                <span className="ml-1 text-sm text-brand-slate">
                  {product.rating}
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="mt-auto text-center py-2.5 rounded-lg bg-brand-amber text-brand-navy font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Details
            </motion.div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}
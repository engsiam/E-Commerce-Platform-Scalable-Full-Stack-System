'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function FeaturedProductsSection() {
  const { products } = useProducts();
  const featured = products.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-2">
              Featured Products
            </h2>
            <p className="text-brand-slate">
              Hand-picked selections from our collection
            </p>
          </div>
          <Link href="/items">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/items">
            <Button variant="ghost" className="flex items-center gap-2 mx-auto">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
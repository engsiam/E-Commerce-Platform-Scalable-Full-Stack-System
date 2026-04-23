'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function PromoBannerSection() {
  return (
    <section className="py-16 lg:py-24 bg-brand-navy overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-amber/10 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute inset-0 border border-white/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          style={{
            background: 'linear-gradient(90deg, #F5A623, #FFD700, #F5A623)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          New Arrivals
        </motion.div>

        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Discover our latest curated collection. Limited time offers on premium items.
        </p>

        <Link href="/items">
          <Button variant="primary" size="lg">
            Shop Now
          </Button>
        </Link>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm">
          <div className="text-center">
            <span className="block text-2xl font-bold text-brand-amber">500+</span>
            <span className="text-gray-500">Products</span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-brand-amber">50+</span>
            <span className="text-gray-500">Brands</span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-brand-amber">10k+</span>
            <span className="text-gray-500">Customers</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
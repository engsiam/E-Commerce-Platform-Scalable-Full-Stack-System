'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function HeroSection() {
  const { products } = useProducts();
  const featured = products[0];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-brand-cream">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A0E1A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6H6V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={wordVariants} className="overflow-hidden">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-navy leading-tight">
                Discover.
              </h1>
            </motion.div>
            <motion.div variants={wordVariants} className="overflow-hidden">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-navy leading-tight">
                Desire.
              </h1>
            </motion.div>
            <motion.div variants={wordVariants} className="overflow-hidden">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-amber leading-tight">
                Own.
              </h1>
            </motion.div>

            <motion.p
              variants={wordVariants}
              className="text-lg text-brand-slate max-w-md leading-relaxed"
            >
              Curated lifestyle products for those who seek excellence. 
              Every piece tells a story of quality, design, and purpose.
            </motion.p>

            <motion.div variants={wordVariants} className="flex flex-wrap gap-4">
              <Link href="/items">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="ghost" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand-amber/20 rounded-full blur-3xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={featured?.imageUrl || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80'}
                    alt={featured?.title || 'Featured Product'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-brand-amber font-medium uppercase tracking-wide mb-1">
                    Featured
                  </p>
                  <h3 className="font-display text-lg font-bold text-brand-navy mb-1">
                    {featured?.title || 'Merino Wool Turtleneck'}
                  </h3>
                  <p className="text-brand-navy font-semibold">
                    {formatPrice(featured?.price || 189)}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'We curate only the finest products that meet our rigorous standards for craftsmanship and durability.',
  },
  {
    icon: Heart,
    title: 'Customer Obsessed',
    description: 'Every decision we make is centered around delivering exceptional value and service.',
  },
  {
    icon: Sparkles,
    title: 'Timeless Design',
    description: 'We believe in pieces that transcend trends and become cherished possessions.',
  },
];

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function AboutPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4 text-center"
          >
            About Odyssey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-brand-slate text-lg max-w-2xl mx-auto text-center"
          >
            Discover the story behind your destination for curated lifestyle excellence.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-6">
              Our Mission
            </h2>
            <p className="text-brand-slate leading-relaxed">
              At Odyssey, we believe that exceptional products enhance exceptional lives.
              Our mission is to curate a collection of lifestyle items that represent the
              pinnacle of quality, design, and craftsmanship — pieces that you'll treasure
              for years to come.
            </p>
            <p className="text-brand-slate leading-relaxed mt-4">
              Founded with a vision to simplify the pursuit of excellence, we've done the
              research so you don't have to. Each product in our collection is selected for
              its outstanding qualities and ability to enrich your daily experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            {values.map((value, index) => (
              <Card key={index} hover className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-brand-amber" />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-brand-slate">
                  {value.description}
                </p>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Link href="/items">
              <Button size="lg">Explore Our Collection</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
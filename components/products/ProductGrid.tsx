'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ProductGridProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {children}
    </motion.div>
  );
}
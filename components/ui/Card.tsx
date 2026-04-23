import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(10,14,26,0.12)' } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white rounded-xl border border-gray-100 overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
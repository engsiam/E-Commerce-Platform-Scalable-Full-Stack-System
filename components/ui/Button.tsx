import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-brand-amber text-brand-navy hover:bg-amber-400',
    secondary: 'border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-cream',
    ghost: 'text-brand-slate hover:text-brand-navy hover:bg-brand-cream',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3 gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : null}
      {children}
    </motion.button>
  );
}
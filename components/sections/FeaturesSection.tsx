'use client';

import { Shield, Rocket, RefreshCw, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: Shield,
    title: 'Curated Quality',
    description: 'Every product vetted by our expert team to ensure excellence.',
  },
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description: 'Same-day dispatch on orders placed before 2pm.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy for your peace of mind.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service whenever you need it.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Why Choose Odyssey
          </h2>
          <p className="text-brand-slate max-w-2xl mx-auto">
            We go above and beyond to deliver an exceptional shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              hover
              className="p-6 border-2 border-transparent hover:border-brand-amber transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-amber" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brand-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
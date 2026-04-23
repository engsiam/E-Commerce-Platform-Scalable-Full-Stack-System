'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const testimonials = [
  {
    name: 'Alexandra Chen',
    role: 'Design Director',
    content: 'The quality is absolutely exceptional. Every piece I have purchased from Odyssey has become a treasured part of my collection.',
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Marcus Williams',
    role: 'Entrepreneur',
    content: 'Finally, a brand that understands the value of craft and design. Customer service is outstanding.',
    rating: 5,
    initials: 'MW',
  },
  {
    name: 'Sophie Laurent',
    role: 'Architecture',
    content: 'From browsing to delivery, everything is seamless. The products exceed expectations every single time.',
    rating: 5,
    initials: 'SL',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            What Our Customers Say
          </h2>
          <p className="text-brand-slate max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Odyssey their choice.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full p-6 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-amber/20" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-amber flex items-center justify-center text-brand-navy font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-brand-slate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                  ))}
                </div>
                <p className="text-brand-slate leading-relaxed">
                  "{testimonial.content}"
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HeroSection() {
  const { products } = useProducts();
  const featured = products[0];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-cream">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A0E1A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6H6V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-xl"
          >
            <motion.h1
              variants={wordVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.05]"
            >
              Discover.
            </motion.h1>

            <motion.h1
              variants={wordVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.05]"
            >
              Desire.
            </motion.h1>

            <motion.h1
              variants={wordVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-amber leading-[1.05]"
            >
              Own.
            </motion.h1>

            <motion.p
              variants={wordVariants}
              className="text-lg text-brand-slate max-w-md leading-relaxed"
            >
              Curated lifestyle products for those who seek excellence. Every
              piece tells a story of quality, design, and purpose.
            </motion.p>

            <motion.div
              variants={wordVariants}
              className="flex items-center gap-6 flex-wrap"
            >
              <Link href="/items">
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:shadow-lg hover:scale-[1.03] transition-all"
                >
                  Shop Now
                </Button>
              </Link>

              <Link
                href="#features"
                className="text-brand-slate hover:text-brand-navy transition"
              >
                Learn More →
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block mt-10 lg:mt-0"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative max-w-md mx-auto lg:ml-auto"
            >
              {/* Glow */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand-amber/20 rounded-full blur-3xl" />

              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(10,14,26,0.15)] overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={featured?.imageUrl}
                    alt={featured?.title}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    className="object-cover object-[center_20%]"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs text-brand-amber font-medium uppercase tracking-wide mb-1">
                    Featured
                  </p>

                  <h3 className="font-display text-lg font-bold text-brand-navy mb-1">
                    {featured?.title}
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

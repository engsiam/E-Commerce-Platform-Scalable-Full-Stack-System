import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PromoBannerSection } from '@/components/sections/PromoBannerSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <PromoBannerSection />
    </>
  );
}
import { Hero } from "@/components/site/hero";
import { BrandsMarquee } from "@/components/site/brands-marquee";
import { AboutTeaser } from "@/components/site/about-teaser";
import { StatsBar } from "@/components/site/stats-bar";
import { ServicesGrid } from "@/components/site/services-grid";
import { CtaSection } from "@/components/site/cta-section";
import {
  getBrands,
  getCategories,
  getContactInfo,
  getHeroContent,
  getStats,
} from "@/lib/data";

export default async function HomePage() {
  const [hero, brands, categories, stats, contactInfo] = await Promise.all([
    getHeroContent(),
    getBrands(),
    getCategories(),
    getStats(),
    getContactInfo(),
  ]);

  return (
    <>
      <Hero heroContent={hero} />
      <BrandsMarquee brands={brands} />
      <AboutTeaser />
      <StatsBar stats={stats} />
      <ServicesGrid categories={categories} />
      <CtaSection whatsapp={contactInfo.whatsapp} />
    </>
  );
}

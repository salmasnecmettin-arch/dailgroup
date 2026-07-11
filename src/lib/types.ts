export type ServiceCategory = "gida" | "icecek" | "insaat";

export interface Brand {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  about: string;
  color: string;
  website?: string;
  logo: string;
  cover: string;
  gallery: string[];
  order: number;
  active: boolean;
}

export interface CategoryInfo {
  key: ServiceCategory;
  title: string;
  shortDescription: string;
  cover: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  backgroundImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbedUrl: string;
  workingHours: string;
  social: { instagram?: string; facebook?: string; linkedin?: string };
  footerImage: string;
}

export interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  timeline: { year: string; title: string; description: string }[];
  managementMessage: string;
}

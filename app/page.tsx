import Hero from '@/components/Hero';
import HomePageClient from '@/components/HomePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Star – Alcohol & Grocery Delivery | Home',
  description: 'Fast delivery, in-store pickup, and curated essentials delivered to your door with premium care.',
};

export default function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <Hero />
      <HomePageClient />
    </div>
  );
}

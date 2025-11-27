import type { Metadata } from 'next';
import FavouritesPageClient from '@/components/FavouritesPageClient';

export const metadata: Metadata = {
  title: 'Delivery Star – Alcohol & Grocery Delivery | Favourites',
  description: 'Browse and manage your saved favourites with quick add-to-cart and premium visuals.',
};

export default function FavouritesPage() {
  return <FavouritesPageClient />;
}

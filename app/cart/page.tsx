import type { Metadata } from 'next';
import CartPageClient from '@/components/CartPageClient';

export const metadata: Metadata = {
  title: 'Delivery Star – Alcohol & Grocery Delivery | Cart',
  description: 'Review your Delivery Star cart, adjust quantities, and preview totals before checkout.',
};

export default function CartPage() {
  return <CartPageClient />;
}

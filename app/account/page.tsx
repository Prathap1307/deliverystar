import type { Metadata } from 'next';
import AccountPageClient from '@/components/AccountPageClient';

export const metadata: Metadata = {
  title: 'Delivery Star – Alcohol & Grocery Delivery | Account',
  description: 'Manage your Delivery Star profile, membership perks, and live order statuses in one place.',
};

export default function AccountPage() {
  return <AccountPageClient />;
}

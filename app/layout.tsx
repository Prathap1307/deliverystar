import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/components/context/CartContext';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ClerkProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    </CartProvider>
  );
}

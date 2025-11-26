import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/components/context/CartContext';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 text-gray-900 antialiased">
          <CartProvider>
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6">{children}</main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

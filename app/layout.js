import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from '@/app/components/context/CartContext';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

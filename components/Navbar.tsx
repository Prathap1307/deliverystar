'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/context/CartContext';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiFilter } from 'react-icons/fi';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartQuantity } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src="/brand.png" alt="Delivery Star" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900">Delivery Star</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 shadow-inner">
            <FiSearch className="text-gray-400" />
            <input
              placeholder="Search dishes, essentials..."
              className="w-64 bg-transparent text-sm focus:outline-none"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-full px-4 py-2 w-64 focus:ring-2 focus:ring-purple-500"
          />
          <button className="relative p-2 rounded-full hover:bg-gray-100" onClick={() => setCartOpen(!cartOpen)}>
            <FiShoppingCart size={24} />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )}
          </Link>
          <Link
            href="/favourites"
            className="rounded-full border border-gray-200 p-2 text-gray-700 hover:border-purple-500 hover:text-purple-600"
            aria-label="Favourites"
          >
            <FiHeart />
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-gray-200 p-2 text-gray-700 hover:border-purple-500 hover:text-purple-600"
            aria-label="Account"
          >
            <FiUser />
          </Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 flex flex-col gap-4 animate-slideDown">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-purple-500"
          />

          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiShoppingCart size={22} /> Cart ({cartQuantity})
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"><FiHeart size={22} /> Wishlist</button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"><FiUser size={22} /> Account</button>
        </div>
      )}
    </header>
  );
}

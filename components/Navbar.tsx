'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useCart } from '@/components/context/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/favourites', label: 'Favourites' },
    { href: '/cart', label: 'Cart' },
    { href: '/account', label: 'Account' },
  ];

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

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-gray-700 hover:text-purple-600">
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
          >
            <FiShoppingBag />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-purple-700 shadow">
                {itemCount}
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
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="flex items-center gap-2 px-4 py-3">
            <FiSearch className="text-gray-400" />
            <input
              placeholder="Search dishes, essentials..."
              className="w-full bg-transparent text-sm focus:outline-none"
              aria-label="Search products"
            />
          </div>
          <div className="grid gap-2 px-4 pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.href === '/cart' && itemCount > 0 && (
                  <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs font-bold text-white">{itemCount}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

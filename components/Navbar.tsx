'use client'

import Image from 'next/image';
import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiFilter } from 'react-icons/fi';

// NAVBAR
export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 2;

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image src="/brand.png" width={45} height={45} alt="Brand Logo" />
          <span className="font-bold text-xl text-gray-800">Delivery Star</span>
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
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100"><FiHeart size={24} /></button>
          <button className="p-2 rounded-full hover:bg-gray-100"><FiUser size={24} /></button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 flex flex-col gap-4 animate-slideDown">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-purple-500"
          />

          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiShoppingCart size={22} /> Cart ({cartCount})
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"><FiHeart size={22} /> Wishlist</button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"><FiUser size={22} /> Account</button>
        </div>
      )}
    </header>
  );
}

// FILTER DROPDOWN (Mobile)
export function MobileFilter({ selected, setSelected, categories }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden px-4 mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-purple-600 text-white px-4 py-2 rounded-full shadow-md"
      >
        <span>Filter: {selected}</span>
        <FiFilter size={20} />
      </button>

      {open && (
        <div className="bg-white mt-2 rounded-lg shadow-md p-3 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setOpen(false);
              }}
              className={`w-full text-left p-2 rounded ${selected === cat ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

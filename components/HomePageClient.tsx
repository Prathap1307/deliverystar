'use client';

import { useMemo, useState } from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import QuickViewModal from '@/components/QuickViewModal';
import { products, type Product } from '@/data/products';
import { favouriteItems } from '@/data/favourites';
import { useCart } from '@/components/context/CartContext';
import Link from 'next/link';
import { FiMapPin, FiNavigation } from 'react-icons/fi';

function InStorePickupBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
            <FiMapPin /> In-Store Pickup ready
          </p>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">We deliver and also support In-Store Pickup.</h2>
            <p className="text-base text-purple-50">
              Upload screenshot OR type pickup location + drop location. Pay delivery fee and tap ‘Book In-Store Pickup’.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5"
            >
              <FiNavigation /> Book Delivery For In-Store Pickup
            </Link>
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white/90">
              Lightning-fast rider dispatch
            </span>
          </div>
        </div>
        <div className="relative w-full max-w-xs self-end md:self-center">
          <div className="absolute inset-0 -translate-y-4 translate-x-4 rounded-3xl bg-white/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl bg-white/10 p-4 shadow-xl backdrop-blur">
            <div className="space-y-3 rounded-2xl bg-white/10 p-4 text-sm text-purple-50 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Pickup</span>
                <span className="text-white/80">Market Street</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Dropoff</span>
                <span className="text-white/80">Sunset District</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">ETA</span>
                <span className="text-white/80">35 mins</span>
              </div>
              <p className="text-xs text-purple-100/90">Fully touch-friendly. Works on every phone.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [favourites, setFavourites] = useState<Product[]>(favouriteItems);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category).filter(Boolean))], []);

  const filteredProducts = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  const handleFavouriteToggle = (product: Product) => {
    setFavourites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <div className="space-y-10 pb-6">
      <InStorePickupBanner />
      <Hero />

      <section className="space-y-6">
        <SectionTitle
          eyebrow="Tonight's picks"
          title="Discover the new essentials"
          action={
            <div className="flex gap-2 overflow-x-auto rounded-full bg-white p-1 shadow-inner">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
              onQuickView={handleQuickView}
              onToggleFavourite={handleFavouriteToggle}
              isFavourite={favourites.some((fav) => fav.id === product.id)}
            />
          ))}
        </div>
      </section>

      <QuickViewModal
        open={quickViewOpen}
        product={selectedProduct}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={(product) => {
          addItem(product);
          setQuickViewOpen(false);
        }}
        onFavourite={(product) => handleFavouriteToggle(product)}
      />
    </div>
  );
}

'use client'

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductList from '../components/ProductList';
import { products } from '../lib/data';
import { useCart } from '@/components/context/CartContext';
import { useMemo, useState } from 'react';
import { Product } from '@/data/products';
import { favouriteItems } from '@/data/favourites';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';

export default function HomePage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [favourites, setFavourites] = useState<Product[]>(favouriteItems);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category).filter(Boolean))], []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

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
    <div className="space-y-10">
      <div className="bg-gray-50 min-h-screen">

        <Hero />
        <CategoryCarousel />
      </div>
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
                    activeCategory === category
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

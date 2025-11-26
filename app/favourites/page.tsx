'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { favouriteItems } from '@/data/favourites';
import { useCart } from '@/components/context/CartContext';
import type { Product } from '@/data/products';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<Product[]>(favouriteItems);
  const { addItem } = useCart();

  const toggleFavourite = (product: Product) => {
    setFavourites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Saved" title="Favourites" />
      {favourites.length === 0 ? (
        <EmptyState
          title="No favourites yet"
          description="Tap the heart on any product to save it for later and build your personal list."
          ctaLabel="Explore products"
          ctaHref="/"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
              onQuickView={() => {}}
              onToggleFavourite={toggleFavourite}
              isFavourite
            />
          ))}
        </div>
      )}
    </div>
  );
}

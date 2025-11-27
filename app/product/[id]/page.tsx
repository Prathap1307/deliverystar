'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { products, type Product } from '@/data/products';
import { useCart } from '@/components/context/CartContext';

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        <p className="text-gray-600">The item you are looking for might have been removed or is unavailable.</p>
        <Link href="/" className="rounded-full bg-purple-600 px-5 py-3 text-white font-semibold shadow hover:bg-purple-700">
          Return home
        </Link>
      </div>
    );
  }

  const similar = products.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductDetails product={product} similar={similar} />;
}

function ProductDetails({ product, similar }: { product: Product; similar: Product[] }) {
  const { addItem } = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Featured</p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
          <p className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-purple-700"
            >
              <FiShoppingBag /> Add to cart
            </button>
            <button className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600">
              <FiHeart /> Add to favourites
            </button>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-inner">
            <p className="text-sm font-semibold text-gray-700">Delivery promise</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
              <li>Under 60 minutes in metro areas</li>
              <li>Eco-packaging and contactless handoff</li>
              <li>Live rider updates with every order</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <SectionTitle eyebrow="You might also like" title="Similar flavours" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={addItem}
              onQuickView={(p) => {
                setSelected(p);
                setQuickViewOpen(true);
              }}
              onToggleFavourite={() => {}}
              isFavourite={false}
            />
          ))}
        </div>
      </section>

      <QuickViewModal
        open={quickViewOpen}
        product={selected}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={(p) => addItem(p)}
        onFavourite={() => setQuickViewOpen(false)}
      />

      <div className="text-center text-sm text-gray-500">
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
}

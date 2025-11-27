'use client';

import Image from 'next/image';
import { FiHeart, FiX } from 'react-icons/fi';
import type { Product } from '@/data/products';

interface Props {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onFavourite: (product: Product) => void;
}

export default function QuickViewModal({ open, product, onClose, onAddToCart, onFavourite }: Props) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm px-4 md:items-center">
      <div className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-t-3xl bg-white shadow-2xl md:h-auto md:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Close quick view"
        >
          <FiX size={22} />
        </button>
        <div className="grid h-full grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-between p-6 space-y-4 overflow-y-auto md:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-purple-600">Quick view</p>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 rounded-full bg-purple-600 px-5 py-3 text-white font-semibold shadow-md transition hover:bg-purple-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onFavourite(product)}
                className="rounded-full border border-gray-200 p-3 text-gray-700 transition hover:border-purple-500 hover:text-purple-600"
                aria-label="Add to favourites"
              >
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingBag, FiZoomIn } from 'react-icons/fi';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleFavourite: (product: Product) => void;
  isFavourite?: boolean;
}

export default function ProductCard({ product, onAddToCart, onQuickView, onToggleFavourite, isFavourite }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-purple-600 shadow">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => onToggleFavourite(product)}
          className={`absolute right-4 top-4 rounded-full border bg-white/90 p-2 shadow transition hover:scale-110 ${
            isFavourite ? 'border-purple-500 text-purple-600' : 'border-gray-200 text-gray-700'
          }`}
          aria-label="Toggle favourite"
        >
          <FiHeart />
        </button>
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => onQuickView(product)}
            className="mb-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow backdrop-blur"
          >
            <FiZoomIn /> Quick view
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-sm text-gray-500">{product.category}</p>
          <Link href={`/product/${product.id}`} className="text-lg font-semibold text-gray-900 hover:text-purple-600">
            {product.name}
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
          >
            <FiShoppingBag /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

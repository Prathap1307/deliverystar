import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import { products } from '@/data/products';

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find((p) => p.id === params.id);
  return {
    title: product
      ? `Delivery Star – ${product.name} | Alcohol & Grocery Delivery`
      : 'Delivery Star – Product Details',
    description:
      product?.description || 'Explore premium product details, pricing, and delivery-ready options on Delivery Star.',
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const similar = products.filter((p) => p.id !== params.id).slice(0, 3);

  return <ProductDetailsClient product={product!} similar={similar} />;
}

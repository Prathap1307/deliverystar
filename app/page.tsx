import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import ProductList from './components/ProductList';
import { products } from '../lib/data';

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <CategoryCarousel />
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Popular Products</h2>
        <ProductList products={products} />
      </section>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 px-6 py-14 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80"
          alt="Gourmet spread"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">Uber Eats energy. Amazon polish.</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Curated dishes, groceries, and treats delivered in under an hour.
          </h1>
          <p className="text-lg text-white/90">
            Discover chef specials, craft beverages, and daily essentials with white-glove delivery. Your cravings, handled.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cart"
              className="rounded-full bg-white px-6 py-3 text-base font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5"
            >
              Start an order
            </Link>
            <Link
              href="/favourites"
              className="rounded-full border border-white/70 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              View favourites
            </Link>
          </div>
        </div>
        <div className="relative w-full max-w-sm self-end md:self-center">
          <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-3xl bg-white/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl bg-white/10 p-4 shadow-xl backdrop-blur">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                alt="Featured dessert"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <div className="mt-4 space-y-1 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-100">Spotlight</p>
              <h3 className="text-xl font-bold">Matcha Pistachio Cruffin</h3>
              <p className="text-sm text-purple-50">House-made laminated pastry layered with ceremonial matcha cream.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

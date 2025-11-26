import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative text-center h-[60vh] bg-gradient-to-r from-purple-600 to-indigo-600 flex flex-col justify-center items-center text-white mt-16">
      <h1 className="text-5xl md:text-6xl font-bold">Ring, Relax & We’ll Deliver!</h1>
      <p className="mt-4 text-lg md:text-xl max-w-xl">
        Fast and reliable food & grocery delivery right to your doorstep.
      </p>
      <button className="mt-6 bg-yellow-400 text-purple-800 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-300">
        Order Now
      </button>
      <Image
        src="/brand.png"
        width={150}
        height={150}
        className="absolute bottom-0 right-10 animate-bounce"
        alt="Delivery Star Logo"
      />
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative w-11/12 max-w-7xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl mt-8">
      {/* Background Image */}
      <Image
        src="/banner.jpg"
        alt="Care.xyz Home Care Services"
        fill
        className="object-cover brightness-[0.45]"
        priority
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
          Compassionate Care for <br />
          <span className="text-emerald-400">Your Loved Ones</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          From newborn babies to elderly family members—we provide professional,
          secure, and NID-verified caregiving services at your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <Link
            href="/services"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Explore Services
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg"
          >
            How It Works
          </Link>
        </div>
      </div>

      {/* Gradient  */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default Banner;

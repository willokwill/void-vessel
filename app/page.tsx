'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  Plus,
  Instagram,
  Facebook,
  Twitter,
  Mail
} from 'lucide-react';

// --- Types (解決 TypeScript 報錯的關鍵) ---
interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  tag: string | null;
}

interface Story {
  id: number;
  category: string;
  title: string;
  image: string;
}

interface FeatureBannerProps {
  title: string;
  subtitle: string;
  image: string;
  align?: string;
  dark?: boolean;
}

// --- Global Styles ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 20s linear infinite;
    }
    .animate-scroll:hover {
      animation-play-state: paused;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}} />
);

// --- Mock Data ---
const CATEGORIES: string[] = ["Men", "Women", "Lifestyle", "Beauty", "Brands", "Launches", "Sale"];

const BRANDS: string[] = ["NIKE", "STUSSY", "OUR LEGACY", "CARHARTT WIP", "BEAMS PLUS", "SNOW PEAK", "VOID & VESSEL", "ROA", "SALOMON", "NEEDLES"];

const PRODUCTS: Product[] = [
  {
    id: 1,
    brand: "VOID & VESSEL",
    name: "Heavyweight Graphic Hoodie",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    tag: "New"
  },
  {
    id: 2,
    brand: "STUDIO DERIVE",
    name: "Wide Leg Pleated Trousers",
    price: 210.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    tag: "Limited"
  },
  {
    id: 3,
    brand: "VESSEL OBJECTS",
    name: "Ceramic Incense Burner",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1602872030219-cbf9179f5be9?q=80&w=800&auto=format&fit=crop",
    tag: null
  },
  {
    id: 4,
    brand: "ARCHIVE 01",
    name: "Reconstructed Denim Jacket",
    price: 320.00,
    image: "https://images.unsplash.com/photo-1576905341935-4ef244344933?q=80&w=800&auto=format&fit=crop",
    tag: "Sale"
  }
];

const STORIES: Story[] = [
  {
    id: 1,
    category: "LIFESTYLE",
    title: "The Art of Slow Living: A Guide to Modern Ceramics",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "EDITORIAL",
    title: "Studio Visit: Inside the Void & Vessel Design Lab",
    image: "https://images.unsplash.com/photo-1558525284-855c829e553a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "MUSIC",
    title: "Monthly Mix: Sounds for the Concrete Jungle",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
  }
];

// --- Components ---

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group cursor-pointer flex flex-col h-full">
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      {product.tag && (
        <span className="absolute top-0 left-0 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider z-10">
          {product.tag}
        </span>
      )}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button className="absolute bottom-4 right-4 bg-white hover:bg-black hover:text-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl z-20">
        <Plus size={18} />
      </button>
    </div>
    <div className="space-y-1">
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">{product.brand}</p>
      <h3 className="text-sm font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">{product.name}</h3>
      <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
    </div>
  </div>
);

const FeatureBanner = ({ title, subtitle, image, align = "left", dark = false }: FeatureBannerProps) => (
  <div className={`relative group overflow-hidden h-[500px] md:h-[650px] flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} justify-end p-8 md:p-12 cursor-pointer`}>
    <img 
      src={image} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      alt={title}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="relative z-10 space-y-4 max-w-xl">
      <div className="inline-block border-b-2 border-white pb-1 mb-2">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">{subtitle}</span>
      </div>
      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
        {title}
      </h3>
      <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <button className="bg-white text-black px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          Explore
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <GlobalStyles />
      
      {/* Top Banner */}
      <div className="bg-black text-white py-2.5 px-4 text-center text-[10px] font-bold tracking-[0.15em] uppercase border-b border-gray-800">
        <span>Free Worldwide Shipping Over $250 — <span className="text-gray-400">Duties & Taxes Included</span></span>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu / Desktop Nav */}
            <div className="flex items-center">
              <button className="md:hidden mr-4" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} />
              </button>
              <nav className="hidden md:flex items-center space-x-8">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <a key={cat} href="#" className="relative text-[11px] font-black uppercase tracking-widest hover:text-gray-500 transition-colors group">
                    {cat}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase leading-none">
                VOID<span className="not-italic text-gray-400">&</span>VESSEL
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-5">
              <button className="hidden sm:block hover:scale-110 transition-transform">
                <Search size={20} strokeWidth={2} />
              </button>
              <button className="hover:scale-110 transition-transform">
                <User size={20} strokeWidth={2} />
              </button>
              <button className="relative hover:scale-110 transition-transform group">
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-left duration-300">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-black italic uppercase">VOID&VESSEL</h2>
            <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-90 transition-transform duration-300">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
            {CATEGORIES.map(cat => (
              <a key={cat} href="#" className="group flex justify-between items-center text-4xl font-black uppercase tracking-tighter hover:text-gray-500 transition-colors">
                {cat} 
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
            <div className="pt-8 mt-8 border-t space-y-4">
              <a href="#" className="block text-sm font-bold uppercase tracking-widest">Account</a>
              <a href="#" className="block text-sm font-bold uppercase tracking-widest">Contact</a>
              <a href="#" className="block text-sm font-bold uppercase tracking-widest text-red-600">Sale</a>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-80"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 text-white">
            <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom fade-in duration-1000">
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-300">
                Spring / Summer 2024
              </p>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                Urban<br/>Vessels
              </h2>
              <p className="text-sm md:text-lg font-medium max-w-lg leading-relaxed text-gray-300">
                Explore the latest curation of technical outerwear and contemporary staples designed for the modern metropolis.
              </p>
              <div className="flex flex-wrap gap-4 pt-8">
                <button className="bg-white text-black px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-all duration-300">
                  Shop Men
                </button>
                <button className="bg-transparent text-white border border-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                  Shop Women
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Ticker */}
        <div className="border-y border-gray-100 py-6 bg-white overflow-hidden whitespace-nowrap relative">
          <div className="flex animate-scroll hover:pause w-[200%]">
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="mx-8 md:mx-12 text-xl md:text-2xl font-black italic uppercase tracking-tighter text-gray-300 hover:text-black transition-colors cursor-default select-none">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Collection Grid */}
        <section className="grid md:grid-cols-2 gap-1 bg-white">
          <FeatureBanner 
            title="Womens Focus" 
            subtitle="New Arrivals"
            image="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
            align="left"
          />
          <FeatureBanner 
            title="Mens Tech" 
            subtitle="Function First"
            image="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop"
            align="right"
          />
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Curated Goods</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Fresh For The Week</h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors w-fit">
              View All Arrivals <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Journal / Stories Section */}
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">The Journal</h2>
               <button className="hidden md:block text-xs font-black uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-all">
                 Read All Stories
               </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {STORIES.map(story => (
                <article key={story.id} className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200 mb-6">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white px-2 py-1 inline-block border border-gray-200">
                      {story.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                      {story.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
            
            <button className="md:hidden w-full mt-8 text-xs font-black uppercase tracking-widest border border-black px-6 py-4 hover:bg-black hover:text-white transition-all">
               Read All Stories
            </button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
            <Mail className="mx-auto mb-6 opacity-50" size={32} />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Join The Community</h2>
            <p className="text-gray-400 mb-8 font-medium">
              Sign up for early access to drops, exclusive content, and 10% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="flex-1 bg-transparent border border-gray-700 px-6 py-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:border-white text-white placeholder:text-gray-600"
              />
              <button className="bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
                VOID<span className="not-italic">&</span>VESSEL
              </h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                A concept store dedicated to the curation of high-quality goods, independent design, and contemporary culture. Based in the Digital Realm.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black">Brands</a></li>
                <li><a href="#" className="hover:text-black">Men</a></li>
                <li><a href="#" className="hover:text-black">Women</a></li>
                <li><a href="#" className="hover:text-black">Sale</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">Info</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-black">About Us</a></li>
                <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">Follow</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition-colors"><Instagram size={18} /></a>
                <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition-colors"><Facebook size={18} /></a>
                <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition-colors"><Twitter size={18} /></a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <p>© 2024 Void & Vessel. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Secure Payment</span>
              <span>Global Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
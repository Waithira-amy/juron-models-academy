import React from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      
      <div className="flex-grow">
        <Hero />

        {/* Featured Gallery Teaser Section */}
        <section className="py-24 px-6 relative bg-white z-10 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-3 bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full shadow-sm">
                  Our Portfolio
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
                  Glimpse the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Magic</span>
                </h2>
              </div>
              
              <Link 
                href="/gallery" 
                className="group inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md hover:shadow-xl active:scale-95"
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <Link 
                  key={num} 
                  href="/gallery"
                  className="group relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 bg-slate-100"
                >
                  <img 
                    src={`/gallery/pic${num}.jpg`} 
                    alt={`Juron Models Gallery Highlight ${num}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-white/20">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
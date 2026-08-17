"use client";
import React from "react";
import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden flex items-center min-h-[85vh]">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/main-bg.jpg" 
          alt="Juron Models Academy Background" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* The central blur has been completely removed as requested, letting your clean image shine through perfectly! */}
        
        {/* Subtle bottom fade to blend smoothly into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </div>

      {}
      {/* Main Centered Content Container - Shrunk max-width to keep text compact */}
      <div className="max-w-3xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-1000">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-rose-100 text-rose-600 text-[9px] font-extrabold uppercase tracking-[0.25em] mb-4">
          <Crown className="w-3 h-3 text-amber-500" /> Premier Modeling Institution
        </div>
        
        {/* Main Headline - Changed to sans-serif and extrabold for a cleaner, modern look */}
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-4 drop-shadow-sm">
          Shaping Talent. <br className="hidden sm:block" />
          Inspiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">Confidence.</span>
        </h1>
        
        {/* Subheadline - Reduced text size and max width */}
        <p className="text-[13px] md:text-[15px] text-slate-700 font-medium max-w-lg mx-auto leading-relaxed mb-10 drop-shadow-sm">
          East Africa's premier institution for discovering, nurturing, and empowering the next generation of professional models, pageant titleholders, and creative stars.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/register" 
            className="group w-full sm:w-auto bg-gradient-to-r from-rose-600 to-rose-700 text-white px-8 py-4 rounded-full font-bold tracking-[0.1em] uppercase text-[11px] shadow-[0_8px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            Apply for Mr & Miss Machakos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/gallery" 
            className="w-full sm:w-auto bg-white/90 backdrop-blur-md text-slate-900 px-8 py-4 rounded-full font-bold tracking-[0.1em] uppercase text-[11px] border border-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5"
          >
            Signature Events <Crown className="w-4 h-4" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
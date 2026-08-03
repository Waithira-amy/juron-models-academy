import React from "react";
import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden flex items-center min-h-[85vh]">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-slate-50">
        <img 
          src="/jma-background.png" 
          alt="Juron Models Academy Background" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* NEW: A strong, blurred white orb directly behind the text to guarantee readability */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-white/95 blur-[70px] pointer-events-none rounded-full" />
        
        {/* Bottom fade to blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Main Centered Content Container - Shrunk max-width */}
      <div className="max-w-3xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center mt-4 animate-in zoom-in-95 duration-1000">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-rose-100 text-rose-600 text-[9px] font-extrabold uppercase tracking-[0.25em] mb-5">
          <Crown className="w-3 h-3 text-amber-500" /> Premier Modeling Institution
        </div>
        
        {/* Main Headline - Reduced Size */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-5 drop-shadow-sm">
          Shaping Talent. <br className="hidden sm:block" />
          Inspiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">Confidence.</span>
        </h1>
        
        {/* Subheadline - Darker and Bolder for better contrast */}
        <p className="text-[13px] md:text-[14px] text-slate-800 max-w-md leading-relaxed font-semibold mb-8 drop-shadow-sm">
          East Africa's premier institution for discovering, nurturing, and empowering the next generation of professional models, pageant titleholders, and creative stars.
        </p>
        
        {/* UPDATED: Registration CTA Buttons - Reduced Size and Padding */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-rose-800 text-white px-6 py-3 rounded-full font-bold tracking-[0.1em] uppercase text-[10px] shadow-[0_8px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            Register for Mr & Miss Mavoko <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          
          <Link href="/#events" className="w-full sm:w-auto bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 rounded-full font-bold tracking-[0.15em] uppercase text-[10px] border border-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1">
            Signature Events <Crown className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
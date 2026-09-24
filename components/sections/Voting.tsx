"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Crown, Camera, Globe, Timer, ArrowRight } from "lucide-react";

export default function Voting() {
  // Set the target date for Sunday 27th September 2026
  const TARGET_DATE = new Date("2026-09-27T00:00:00");

  const calculateTimeLeft = () => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="voting" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      
      {/* LESS BLURRY, MORE VISIBLE BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-gradient-to-b from-white/70 via-white/30 to-slate-50/90 backdrop-blur-[2px]" /> 
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-md">
            <Timer className="w-4 h-4" /> Official Voting Portal
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight drop-shadow-md">
            Voting Categories
          </h2>
          <p className="text-slate-800 font-medium text-sm md:text-base max-w-2xl leading-relaxed mb-10 drop-shadow-sm bg-white/40 py-2 px-4 rounded-xl backdrop-blur-sm">
            Select your region below to support and cast your vote for the next generation of leaders and ambassadors for Machakos County.
          </p>

          {/* Enhanced Countdown Grid */}
          <div className="bg-white/95 backdrop-blur-xl border-t-4 border-t-amber-400 border-x border-b border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl w-full relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <h3 className="relative z-10 text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
              {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? "Voting is now officially open!" : "Voting Opens In:"}
            </h3>
            
            {isMounted && (
              <div className="relative z-10 grid grid-cols-4 gap-2 md:gap-4 divide-x divide-slate-200">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 drop-shadow-sm">{timeLeft.days}</span>
                  <span className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 drop-shadow-sm">{timeLeft.hours}</span>
                  <span className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 drop-shadow-sm">{timeLeft.minutes}</span>
                  <span className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-500 to-amber-500 drop-shadow-sm animate-pulse">{timeLeft.seconds}</span>
                  <span className="text-[9px] md:text-xs text-rose-400 font-bold uppercase tracking-widest mt-2">Secs</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Voting Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 1. Mavoko (Rose Theme) */}
          <div className="bg-white/95 backdrop-blur-xl border border-rose-100 rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(225,29,72,0.15)] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Crown className="w-10 h-10 text-rose-500 drop-shadow-sm" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700">Mavoko</span></h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
              Vote for the outstanding representatives from Syokimau, Mlolongo, Athi River, and the wider Mavoko environs.
            </p>
            <Link href="/voting/mavoko" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:shadow-[0_5px_20px_rgba(225,29,72,0.4)] hover:from-rose-600 hover:to-rose-700 transition-all">
              Enter Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2. Township (Amber Theme) */}
          <div className="bg-white/95 backdrop-blur-xl border border-amber-100 rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(245,158,11,0.15)] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center mb-6 border border-amber-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-10 h-10 text-amber-500 drop-shadow-sm" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Township</span></h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
              Vote for the premier candidates representing Machakos Town, Machakos University, Joska, and immediate township limits.
            </p>
            <Link href="/voting/township" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:shadow-[0_5px_20px_rgba(245,158,11,0.4)] hover:from-amber-600 hover:to-amber-700 transition-all">
              Enter Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3. Diaspora (Sky Theme) */}
          <div className="bg-white/95 backdrop-blur-xl border border-sky-100 rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(14,165,233,0.15)] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-50 rounded-full flex items-center justify-center mb-6 border border-sky-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-10 h-10 text-sky-500 drop-shadow-sm" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">Diaspora</span></h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
              Vote for the global ambassadors representing the county from Nairobi, Nakuru, Mombasa, and other regions.
            </p>
            <Link href="/voting/diaspora" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:shadow-[0_5px_20px_rgba(14,165,233,0.4)] hover:from-sky-600 hover:to-sky-700 transition-all">
              Enter Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
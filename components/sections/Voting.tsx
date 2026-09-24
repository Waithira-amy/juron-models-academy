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

  const isVotingOpen = isMounted && 
    timeLeft.days === 0 && 
    timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && 
    timeLeft.seconds === 0;

  return (
    <section id="voting" className="pt-20 pb-12 md:pt-24 md:pb-20 relative overflow-hidden">
      
      {/* SHARP HERO BACKGROUND - Removed blur, kept light overlay for readability */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-white/85" /> 
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
        
        {/* Header & Colorful Countdown Timer */}
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-[9px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Timer className="w-3 h-3" /> Official Voting Portal
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight drop-shadow-sm">
            Voting Categories
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-xl leading-relaxed mb-8">
            Select your region below to support and cast your vote for the next generation of leaders and ambassadors for Machakos County.
          </p>

          {/* Dynamic Colorful Countdown Display */}
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-sky-50 border border-slate-200 rounded-[2rem] p-5 md:p-6 shadow-lg max-w-xl w-full">
            <h3 className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              {isVotingOpen ? "Voting is now officially open!" : "Voting Opens In:"}
            </h3>
            
            {!isVotingOpen && isMounted && (
              <div className="grid grid-cols-4 gap-2 divide-x divide-slate-300/50">
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-serif font-bold text-slate-800">{timeLeft.days}</span>
                  <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-serif font-bold text-slate-800">{timeLeft.hours}</span>
                  <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-serif font-bold text-slate-800">{timeLeft.minutes}</span>
                  <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-serif font-bold text-slate-800">{timeLeft.seconds}</span>
                  <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Secs</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Voting Categories Grid - More compact with color themes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Mavoko (Rose Theme) */}
          <div className="bg-gradient-to-br from-rose-50/90 to-white border border-rose-200 rounded-[1.5rem] p-6 shadow-lg flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 border border-rose-100 shadow-sm group-hover:scale-105 transition-transform">
              <Crown className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Mr & Miss Machakos<br/><span className="text-rose-600">Mavoko</span></h3>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-6 flex-grow">
              Vote for the outstanding representatives from Syokimau, Mlolongo, Athi River, and the wider Mavoko environs.
            </p>
            {isVotingOpen ? (
              <Link href="/voting/mavoko" className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-md">
                Enter Portal <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button disabled className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 cursor-not-allowed">
                Opens Sep 27 <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Township (Amber Theme) */}
          <div className="bg-gradient-to-br from-amber-50/90 to-white border border-amber-200 rounded-[1.5rem] p-6 shadow-lg flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 border border-amber-100 shadow-sm group-hover:scale-105 transition-transform">
              <Camera className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Mr & Miss Machakos<br/><span className="text-amber-600">Township</span></h3>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-6 flex-grow">
              Vote for the premier candidates representing Machakos Town, Machakos University, Joska, and immediate township limits.
            </p>
            {isVotingOpen ? (
              <Link href="/voting/township" className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-md">
                Enter Portal <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button disabled className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 cursor-not-allowed">
                Opens Sep 27 <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 3. Diaspora (Sky Theme) */}
          <div className="bg-gradient-to-br from-sky-50/90 to-white border border-sky-200 rounded-[1.5rem] p-6 shadow-lg flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 border border-sky-100 shadow-sm group-hover:scale-105 transition-transform">
              <Globe className="w-7 h-7 text-sky-500" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Mr & Miss Machakos<br/><span className="text-sky-600">Diaspora</span></h3>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-6 flex-grow">
              Vote for the global ambassadors representing the county from Nairobi, Nakuru, Mombasa, and other regions outside the county borders.
            </p>
            {isVotingOpen ? (
              <Link href="/voting/diaspora" className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-md">
                Enter Portal <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button disabled className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 cursor-not-allowed">
                Opens Sep 27 <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { Crown, Camera, Globe, Timer, ArrowRight } from "lucide-react";

export default function Voting() {
  // Set the target date for Sunday 27th October 2026
  const TARGET_DATE = new Date("2026-10-27T00:00:00");

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
    <section id="voting" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm" /> 
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header & Countdown Timer */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Timer className="w-4 h-4" /> Official Voting Portal
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight drop-shadow-sm">
            Voting Categories
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
            Select your region below to support and cast your vote for the next generation of leaders and ambassadors for Machakos County.
          </p>

          {/* Dynamic Countdown Display */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl w-full">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
              {isVotingOpen ? "Voting is now officially open!" : "Voting Opens In:"}
            </h3>
            
            {!isVotingOpen && isMounted && (
              <div className="grid grid-cols-4 gap-4 divide-x divide-slate-100">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{timeLeft.days}</span>
                  <span className="text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{timeLeft.hours}</span>
                  <span className="text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{timeLeft.minutes}</span>
                  <span className="text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{timeLeft.seconds}</span>
                  <span className="text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Secs</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Voting Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Mavoko */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100 shadow-sm group-hover:scale-110 transition-transform">
              <Crown className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-rose-500">Mavoko</span></h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-8 flex-grow">
              Vote for the outstanding representatives from Syokimau, Mlolongo, Athi River, and the wider Mavoko environs.
            </p>
            <button disabled={!isVotingOpen} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:hover:bg-slate-900 cursor-not-allowed">
              {isVotingOpen ? "Enter Portal" : "Opens Oct 27"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Township */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100 shadow-sm group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-amber-500">Township</span></h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-8 flex-grow">
              Vote for the premier candidates representing Machakos Town, Machakos University, Joska, and immediate township limits.
            </p>
            <button disabled={!isVotingOpen} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:hover:bg-slate-900 cursor-not-allowed">
              {isVotingOpen ? "Enter Portal" : "Opens Oct 27"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Diaspora */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Mr & Miss Machakos<br/><span className="text-sky-500">Diaspora</span></h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-8 flex-grow">
              Vote for the global ambassadors representing the county from Nairobi, Nakuru, Mombasa, and other regions outside the county borders.
            </p>
            <button disabled={!isVotingOpen} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:hover:bg-slate-900 cursor-not-allowed">
              {isVotingOpen ? "Enter Portal" : "Opens Oct 27"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
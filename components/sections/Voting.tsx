"use client";
import React, { useState, useEffect } from "react";
import { Clock, Users, ArrowRight, Camera, Globe, Crown } from "lucide-react";
import Link from "next/link";

export default function Voting() {
  // Target set exactly to October 19, 2026, 23:59:59 EAT
  const TARGET_DATE = new Date("2026-10-19T23:59:59+03:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Stop timer at zero
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsClosed(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [TARGET_DATE]);

  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-slate-50 min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header & Countdown */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-4 tracking-tight drop-shadow-sm">
            Voting <span className="text-amber-500">Categories</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium mb-10">
            Select a region below to cast your M-Pesa vote for your favorite delegates.
          </p>

          <div className="inline-flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-rose-500">
              <Clock className={`w-5 h-5 ${!isClosed && "animate-pulse"}`} />
              <span className="text-xs font-bold uppercase tracking-widest">
                {isClosed ? "Voting Closed" : "Voting Closes In"}
              </span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-6 text-slate-900">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((time, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className={`text-3xl md:text-5xl font-black font-mono px-4 py-2 rounded-xl border shadow-inner ${isClosed ? 'bg-rose-50 text-rose-400 border-rose-100' : 'bg-slate-50 text-slate-900 border-slate-100'}`}>
                    {time.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-2 tracking-widest">{time.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link href="/voting/mavoko" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100 group-hover:scale-110 transition-transform">
              <Crown className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Mavoko</h3>
            <p className="text-sm text-slate-500 mb-8 flex-grow">Syokimau, Mlolongo, Athi River, and Mavoko Sub-County.</p>
            <div className="flex items-center justify-between text-rose-500 font-bold text-xs uppercase tracking-widest mt-auto">
              <span>View Nominees</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/voting/township" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 border border-amber-100 group-hover:scale-110 transition-transform">
              <Camera className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Township</h3>
            <p className="text-sm text-slate-500 mb-8 flex-grow">Machakos Town, University, and Central Environs.</p>
            <div className="flex items-center justify-between text-amber-500 font-bold text-xs uppercase tracking-widest mt-auto">
              <span>View Nominees</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/voting/diaspora" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 border border-sky-100 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-sky-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Diaspora</h3>
            <p className="text-sm text-slate-500 mb-8 flex-grow">Global & Countrywide Ambassadors outside the County.</p>
            <div className="flex items-center justify-between text-sky-500 font-bold text-xs uppercase tracking-widest mt-auto">
              <span>View Nominees</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
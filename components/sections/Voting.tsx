"use client";
import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, Camera, Globe, Crown } from "lucide-react";
import Link from "next/link";

// 1. ADD NEW CATEGORIES AND THEIR DEADLINES HERE
const CATEGORY_DATA = [
  {
    id: "mavoko",
    name: "Mavoko",
    desc: "Syokimau, Mlolongo, Athi River, and Mavoko Sub-County.",
    link: "/voting/mavoko",
    endDate: "2026-10-19T23:59:59+03:00", // Mavoko Deadline
    Icon: Crown,
    theme: { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-500" }
  },
  {
    id: "township",
    name: "Township",
    desc: "Machakos Town, University, and Central Environs.",
    link: "/voting/township",
    endDate: "2026-10-26T23:59:59+03:00", // Township Deadline
    Icon: Camera,
    theme: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-500" }
  },
  {
    id: "diaspora",
    name: "Diaspora",
    desc: "Global & Countrywide Ambassadors outside the County.",
    link: "/voting/diaspora",
    endDate: "2026-11-02T23:59:59+03:00", // Diaspora Deadline
    Icon: Globe,
    theme: { bg: "bg-sky-50", border: "border-sky-100", text: "text-sky-500" }
  }
];

export default function Voting() {
  // Using a single unified timer tick for high performance
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(new Date().getTime()); // Set initial time
    const timer = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to calculate time remaining for each specific card
  const getTimeLeft = (targetDateString: string) => {
    if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0, isClosed: false };
    
    const target = new Date(targetDateString).getTime();
    const diff = target - now;
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isClosed: true };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isClosed: false
    };
  };

  return (
    <section className="pt-32 pb-24 relative overflow-hidden bg-slate-50 min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header (No Timer Up Here Anymore) */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-4 tracking-tight drop-shadow-sm">
            Voting <span className="text-amber-500">Categories</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
            Select a region below to cast your M-Pesa vote for your favorite delegates.
          </p>
        </div>

        {/* Region Cards with Embedded Timers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORY_DATA.map((cat) => {
            const time = getTimeLeft(cat.endDate);
            
            return (
              <Link key={cat.id} href={cat.link} className="group bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col">
                
                {/* Category Icon */}
                <div className={`w-14 h-14 ${cat.theme.bg} rounded-2xl flex items-center justify-center mb-5 border ${cat.theme.border} group-hover:scale-110 transition-transform`}>
                  <cat.Icon className={`w-7 h-7 ${cat.theme.text}`} />
                </div>
                
                {/* Category Info */}
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">{cat.desc}</p>
                
                {/* INDIVIDUAL MINI TIMER */}
                <div className="mb-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full">
                  <div className={`flex items-center gap-1.5 mb-3 ${time.isClosed ? 'text-rose-500' : 'text-slate-700'}`}>
                    <Clock className={`w-4 h-4 ${!time.isClosed && "text-amber-500 animate-pulse"}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {time.isClosed ? "Voting Closed" : "Voting Closes In"}
                    </span>
                  </div>
                  
                  {!time.isClosed ? (
                    <div className="flex justify-between items-center text-center px-1">
                      <div className="flex flex-col"><span className="text-xl md:text-2xl font-black font-mono text-slate-900">{time.days.toString().padStart(2, '0')}</span><span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Days</span></div>
                      <span className="text-slate-300 font-black pb-3">:</span>
                      <div className="flex flex-col"><span className="text-xl md:text-2xl font-black font-mono text-slate-900">{time.hours.toString().padStart(2, '0')}</span><span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Hrs</span></div>
                      <span className="text-slate-300 font-black pb-3">:</span>
                      <div className="flex flex-col"><span className="text-xl md:text-2xl font-black font-mono text-slate-900">{time.minutes.toString().padStart(2, '0')}</span><span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Mins</span></div>
                      <span className="text-slate-300 font-black pb-3">:</span>
                      <div className="flex flex-col"><span className="text-xl md:text-2xl font-black font-mono text-rose-500">{time.seconds.toString().padStart(2, '0')}</span><span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Secs</span></div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-2 bg-rose-50 rounded-lg">
                      <span className="text-rose-500 font-bold text-xs uppercase tracking-widest">Time's Up</span>
                    </div>
                  )}
                </div>

                {/* View Nominees Button */}
                <div className={`flex items-center justify-between ${cat.theme.text} font-bold text-xs uppercase tracking-widest mt-auto`}>
                  <span>View Nominees</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
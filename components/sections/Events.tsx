"use client";
import React from "react";
import { Crown, Camera } from "lucide-react";

export default function Events() {
  return (
    <section id="events" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        {}
        <div className="fixed inset-0 bg-white/30" /> 
      </div>

      {}
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header */}
        <div className="flex justify-center mb-10">
          <div className="max-w-xl w-full text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-200 shadow-sm">
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">Upcoming Voting categories</h2>
            <p className="text-slate-700 text-[13px] leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
              Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders and ambassadors from the region.
            </p>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Mr & Miss Machakos - Mavoko */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Mavoko Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-mavoko'); if (fallback) fallback.style.display = 'block'; }} />
                <Crown id="icon-fallback-mavoko" className="w-5 h-5 text-rose-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Mavoko</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                One of our flagship annual events, this is a premier beauty pageant and leadership platform. Winners become ambassadors who champion positive social change while representing the region at various public engagements.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Event Emphasis:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {["Leadership", "Community Service", "Tourism Promotion", "Youth Empowerment", "Cultural Heritage", "Fashion & Creativity"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos - Township */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Township Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-machakos'); if (fallback) fallback.style.display = 'block'; }} />
                <Camera id="icon-fallback-machakos" className="w-5 h-5 text-amber-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Township</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                Our county flagship pageant that showcases the beauty, culture, diversity, tourism potential, and talent within Machakos County. A respected platform for nurturing future leaders and brand ambassadors.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Platform Opportunities:</h4>
                <ul className="space-y-2.5">
                  {["Develop leadership skills", "Promote local tourism", "Advocate for communities", "Fashion industry exposure"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
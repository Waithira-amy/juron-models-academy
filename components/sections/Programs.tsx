"use client";
import React from "react";
import { Crown, Camera } from "lucide-react";

export default function Events() {
  return (
    <section id="events" className="py-24 relative border-t border-slate-100 bg-slate-50 overflow-hidden">
      
      {/* Background Image Watermark Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/main-bg.jpg" 
          alt="Background Texture" 
          className="w-full h-full object-cover object-center"
        />
        {/* Crisp semi-transparent overlay instead of a blurry opacity drop */}
        <div className="absolute inset-0 bg-slate-50/85" />
      </div>

      {/* Ambient Color Glows (Above the watermark, below the content) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4 z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4 z-0" />
      
      {/* Page Header */}
      <div className="relative mb-16 z-10">
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
            <Crown className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">Signature Events</h2>
          <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed max-w-2xl mx-auto">
            Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders and ambassadors from the region.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Mr & Miss Mavoko */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl hover:border-rose-200 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex-grow flex flex-col">
              
              {/* Mavoko Logo Image */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-slate-200 group-hover:scale-105 transition-transform shadow-sm p-2 overflow-hidden">
                <img 
                  src="/mavoko-logo.png" 
                  alt="Mr & Miss Mavoko Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('icon-fallback-mavoko');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <Crown id="icon-fallback-mavoko" className="w-6 h-6 text-rose-500 hidden" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight">Mr. & Miss Mavoko</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-[13px] md:text-sm flex-grow">
                One of our flagship annual events, this is a premier beauty pageant and leadership platform. Winners become ambassadors who champion positive social change while representing the region at various public engagements.
              </p>
              <div className="mt-auto bg-white/90 p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[10px]">Event Emphasis:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Leadership", "Community Service", "Tourism Promotion", "Youth Empowerment", "Cultural Heritage", "Fashion & Creativity"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl hover:border-amber-200 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex-grow flex flex-col">
              
              {/* Machakos Logo Image */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-slate-200 group-hover:scale-105 transition-transform shadow-sm p-2 overflow-hidden">
                <img 
                  src="/machakos-logo.png" 
                  alt="Mr & Miss Machakos Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('icon-fallback-machakos');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <Camera id="icon-fallback-machakos" className="w-6 h-6 text-amber-500 hidden" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight">Mr. & Miss Machakos</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-[13px] md:text-sm flex-grow">
                Our county flagship pageant that showcases the beauty, culture, diversity, tourism potential, and talent within Machakos County. A respected platform for nurturing future leaders and brand ambassadors.
              </p>
              <div className="mt-auto bg-white/90 p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[10px]">Platform Opportunities:</h4>
                <ul className="space-y-3">
                  {["Develop leadership skills & build confidence", "Promote tourism & showcase local culture", "Advocate for community initiatives", "Gain exposure to the fashion industry"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1" /> <span className="leading-snug">{item}</span>
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
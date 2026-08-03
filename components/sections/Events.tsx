"use client";
import React from "react";
import { Crown, Camera } from "lucide-react";

export default function Events() {
  return (
    <section id="events" className="bg-white py-24 relative border-t border-slate-100">
      
      {/* Page Header */}
      <div className="relative overflow-hidden mb-20 z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200 shadow-sm">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Signature Events</h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders and ambassadors from the region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Mr & Miss Mavoko */}
          <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:shadow-xl hover:border-rose-200 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              
              {/* Mavoko Logo Image */}
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:scale-105 transition-transform shadow-sm p-2 overflow-hidden">
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
                <Crown id="icon-fallback-mavoko" className="w-8 h-8 text-rose-500 hidden" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Mr. & Miss Mavoko</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
                One of our flagship annual events, this is a premier beauty pageant and leadership platform. Winners become ambassadors who champion positive social change while representing the region at various public engagements.
              </p>
              <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-[10px]">Event Emphasis:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Leadership", "Community Service", "Tourism Promotion", "Youth Empowerment", "Cultural Heritage", "Fashion & Creativity"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos */}
          <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:shadow-xl hover:border-amber-200 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              
              {/* Machakos Logo Image */}
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:scale-105 transition-transform shadow-sm p-2 overflow-hidden">
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
                <Camera id="icon-fallback-machakos" className="w-8 h-8 text-amber-500 hidden" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Mr. & Miss Machakos</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
                Our county flagship pageant that showcases the beauty, culture, diversity, tourism potential, and talent within Machakos County. A respected platform for nurturing future leaders and brand ambassadors.
              </p>
              <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-[10px]">Platform Opportunities:</h4>
                <ul className="space-y-4">
                  {["Develop leadership skills & build confidence", "Promote tourism & showcase local culture", "Advocate for community initiatives", "Gain exposure to the fashion industry"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" /> <span className="leading-snug">{item}</span>
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
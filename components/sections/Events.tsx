import React from "react";
import { Crown, Camera } from "lucide-react";

export default function Events() {
  return (
    <section id="events" className="bg-white py-16 relative border-t border-slate-100 overflow-hidden">
      
      {/* Page Header */}
      <div className="relative overflow-hidden mb-16 z-10">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-200 shadow-sm">
            <Crown className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Signature Events</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders and ambassadors from the region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mr & Miss Mavoko */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl hover:border-rose-200 transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-100/50 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                <Crown className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Mr. & Miss Mavoko</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                One of our flagship annual events, this is a premier beauty pageant and leadership platform. Winners become ambassadors who champion positive social change while representing the region at various public engagements.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Event Emphasis:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Leadership", "Community Service", "Tourism Promotion", "Youth Empowerment", "Cultural Heritage", "Fashion & Creativity"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl hover:border-amber-200 transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/50 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                <Camera className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Mr. & Miss Machakos</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Our county flagship pageant that showcases the beauty, culture, diversity, tourism potential, and talent within Machakos County. A respected platform for nurturing future leaders and brand ambassadors.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Platform Opportunities:</h4>
                <ul className="space-y-3">
                  {["Develop leadership skills & build confidence", "Promote tourism & showcase local culture", "Advocate for community initiatives", "Gain exposure to the fashion industry"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-slate-600">
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
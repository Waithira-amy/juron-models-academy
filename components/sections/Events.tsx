"use client";
import React from "react";
import { Crown, Camera, Globe, Ticket, Users, Star } from "lucide-react";

export default function EventTickets() {
  return (
    <section id="events" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-white/30" /> 
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header */}
        <div className="flex justify-center mb-10">
          <div className="max-w-xl w-full text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-200 shadow-sm">
              <Ticket className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">
              Event <span className="text-amber-600">Tickets</span>
            </h2>
            <p className="text-slate-700 text-[13px] leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
              Secure your pass to East Africa's premier modeling and leadership showcase. Join us in celebrating outstanding young talent.
            </p>
          </div>
        </div>

        {/* --- NEW TICKET SECTION --- */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Crown Ticket (Students) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">Crown Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">For Students</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900">500</span>
                <span className="text-sm font-bold text-slate-500 ml-1">KES</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Crown className="w-4 h-4 text-amber-500" /> General Admission
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Crown className="w-4 h-4 text-amber-500" /> Student ID Required
                </div>
                <div className="inline-block px-2.5 py-1 bg-amber-50 text-amber-700 rounded text-[10px] font-bold uppercase tracking-widest mt-2 border border-amber-100">
                  150 Tickets Available
                </div>
              </div>
              <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                Buy Ticket
              </button>
            </div>

            {/* Royal Ticket (Guests) */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 transform md:scale-105 z-10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="w-24 h-24 text-white" />
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              
              <div className="inline-block px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-[9px] font-black uppercase tracking-widest absolute top-4 right-4 shadow-sm">
                Most Popular
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white leading-none">Royal Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">For Guests</span>
                </div>
              </div>
              <div className="mb-6 relative z-10">
                <span className="text-4xl font-black text-white">1,000</span>
                <span className="text-sm font-bold text-slate-400 ml-1">KES</span>
              </div>
              <div className="space-y-3 mb-8 relative z-10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Star className="w-4 h-4 text-amber-400" /> Premium Seating Area
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Star className="w-4 h-4 text-amber-400" /> Red Carpet Access
                </div>
                <div className="inline-block px-2.5 py-1 bg-slate-800 text-amber-400 rounded text-[10px] font-bold uppercase tracking-widest mt-2 border border-slate-700">
                  100 Tickets Available
                </div>
              </div>
              <button className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_20px_rgba(245,158,11,0.4)] relative z-10">
                Buy Ticket
              </button>
            </div>

            {/* Omni Ticket (Partners) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden opacity-90">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-300" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">Omni Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Partners & Services</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-black text-slate-400 uppercase tracking-widest">Invite Only</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Star className="w-4 h-4 text-slate-400" /> VIP Backstage Access
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Star className="w-4 h-4 text-slate-400" /> Service Provider Clearance
                </div>
                <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-widest mt-2">
                  Not For Sale
                </div>
              </div>
              <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                Closed
              </button>
            </div>

          </div>
        </div>

        {/* --- CATEGORIES SECTION --- */}
        <div className="flex justify-center mb-10 border-t border-slate-200 pt-16">
          <div className="max-w-xl w-full text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">Upcoming Categories</h2>
            <p className="text-slate-700 text-[13px] leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
              Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
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

          {/* Mr & Miss Machakos - Diaspora */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Diaspora Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-diaspora'); if (fallback) fallback.style.display = 'block'; }} />
                <Globe id="icon-fallback-diaspora" className="w-5 h-5 text-sky-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Diaspora</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                A unique global platform celebrating beauty, brains, and culture while connecting the Kenyan diaspora back to Machakos County. Honoring young leaders who bridge the gap and champion development from abroad.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Diaspora Focus Areas:</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {["Global Advocacy", "Cultural Exchange", "Investment Promotion", "Networking Opportunities"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";
import React from "react";
import { Users } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Collins",
      role: "Chief Executive Officer",
      image: "/collins.jpg",
      colors: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", line: "bg-rose-500", glow: "bg-rose-100/50" }
    },
    {
      name: "Masconde",
      role: "Chairman",
      image: "/masconde.jpg",
      colors: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", line: "bg-amber-500", glow: "bg-amber-100/50" }
    }
  ];

  return (
    <section id="team" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        {}
        <div className="fixed inset-0 bg-white/30" /> 
      </div>

      {}
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header */}
        <div className="flex justify-center mb-12">
          <div className="max-w-xl w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
              <Users className="w-6 h-6 text-slate-900" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3 drop-shadow-sm">
              Meet The Leadership
            </h2>
            <p className="text-slate-700 text-[13px] md:text-sm leading-relaxed font-medium drop-shadow-sm">
              The visionaries and directors driving Juron Models Academy towards shaping talent and inspiring confidence across East Africa.
            </p>
          </div>
        </div>

        {}
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-stretch max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(225,29,72,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Photo Container */}
              <div className="relative w-36 h-36 md:w-40 md:h-40 mb-6 rounded-[2rem] overflow-hidden border-2 border-white shadow-lg bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-all duration-500 z-10">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <Users className="w-12 h-12 text-slate-300 hidden absolute" />
              </div>
              
              <h3 className="text-2xl font-semibold text-slate-900 font-serif mb-2 relative z-10 tracking-tight">
                {member.name}
              </h3>
              
              <div className={`w-10 h-1 ${member.colors.line} rounded-full mb-4 relative z-10 transition-all duration-300 group-hover:w-16`}></div>
              
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${member.colors.bg} ${member.colors.text} ${member.colors.border} border text-[9px] font-bold uppercase tracking-widest relative z-10 shadow-sm`}>
                {member.role}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
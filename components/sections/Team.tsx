"use client";
import React from "react";
import { Users } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Collins",
      role: "Chief Executive Officer",
      image: "/collins.jpg",
      colors: {
        bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", line: "bg-rose-500", glow: "bg-rose-100/50"
      }
    },
    {
      name: "Masconde",
      role: "Chairman",
      image: "/masconde.jpg",
      colors: {
        bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", line: "bg-amber-500", glow: "bg-amber-100/50"
      }
    }
  ];

  return (
    <section id="team" className="py-24 relative border-t border-slate-100 bg-slate-50 overflow-hidden">
      
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
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/4 z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/4 z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
            <Users className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-900 drop-shadow-sm tracking-tight">
            Meet The Leadership
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The visionaries and directors driving Juron Models Academy towards shaping talent and inspiring confidence across East Africa.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-stretch max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-xl hover:border-rose-100 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Subtle hover glow inside the card */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 ${member.colors.glow} rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Photo Container */}
              <div className="relative w-48 h-48 mb-8 rounded-[32px] overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center group-hover:shadow-lg transition-all duration-500 z-10 rotate-3 group-hover:rotate-0">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <Users className="w-16 h-16 text-slate-300 hidden absolute" />
              </div>
              
              {/* Name & Role */}
              <h3 className="text-3xl font-semibold text-slate-900 font-serif mb-3 relative z-10 tracking-tight">
                {member.name}
              </h3>
              
              <div className={`w-12 h-1 ${member.colors.line} rounded-full mb-5 relative z-10 transition-all duration-300 group-hover:w-20`}></div>
              
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${member.colors.bg} ${member.colors.text} ${member.colors.border} border text-xs font-bold uppercase tracking-widest relative z-10 shadow-sm`}>
                {member.role}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
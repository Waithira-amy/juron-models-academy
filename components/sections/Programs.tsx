"use client";
import React from "react";
import { Briefcase, CheckCircle2, ArrowRight } from "lucide-react";

export default function Programs() {
  const services = [
    { title: "Runway Training", desc: "Master the catwalk with industry-standard techniques." },
    { title: "Fashion Modeling", desc: "Learn to pose and work with high-end brands." },
    { title: "Pageantry", desc: "Comprehensive coaching for beauty pageants." },
    { title: "Personal Branding", desc: "Build a strong, marketable identity." },
    { title: "Etiquette", desc: "Refine your manners and professional conduct." },
    { title: "Photoshoots", desc: "Understand angles and lighting on set." },
    { title: "Portfolios", desc: "Create stunning books that attract clients." },
    { title: "Public Speaking", desc: "Develop confidence to articulate your vision." }
  ];

  return (
    <section id="programs" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-amber-500 mb-4 border border-slate-200 shadow-sm">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">What We Do</h2>
            <p className="text-slate-700 text-[13px] mx-auto leading-relaxed font-medium drop-shadow-sm">
              We offer comprehensive training and development programs designed to build leaders, influencers, and role models capable of making a positive impact.
            </p>
          </div>
        </div>

        {}
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white/95 backdrop-blur-2xl p-5 rounded-2xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-rose-50 transition-colors border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-slate-900 mb-2 leading-tight">{service.title}</h3>
              <p className="text-slate-600 text-[11px] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Capsule */}
        <div className="mt-8 bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left border border-white shadow-2xl">
          <div className="relative z-10">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-900 mb-2">Looking for Talent Management?</h3>
            <p className="text-slate-600 font-medium text-[12px] max-w-lg leading-relaxed">We also provide event coordination, creative arts development, and fashion show production.</p>
          </div>
          <a href="/gallery" className="relative z-10 bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-amber-500 transition-colors whitespace-nowrap shadow-lg flex items-center justify-center gap-2">
            View Our Gallery <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        
      </div>
    </section>
  );
}
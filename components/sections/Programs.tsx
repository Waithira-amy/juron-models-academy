import React from "react";
import { Briefcase, CheckCircle2, ArrowRight } from "lucide-react";

export default function Programs() {
  const services = [
    { title: "Professional Runway Training", desc: "Master the catwalk with industry-standard techniques and posture correction." },
    { title: "Commercial & Fashion Modeling", desc: "Learn how to pose, express emotion, and work with high-end brands." },
    { title: "Pageantry Preparation", desc: "Comprehensive coaching for beauty pageants, from stage presence to Q&A handling." },
    { title: "Personal Branding", desc: "Build a strong, marketable identity that stands out in the creative industry." },
    { title: "Grooming & Etiquette", desc: "Refine your personal presentation, manners, and professional conduct." },
    { title: "Photoshoot Coaching", desc: "Understand angles, lighting, and how to deliver the perfect shot on set." },
    { title: "Portfolio Development", desc: "Create stunning, professional portfolios that attract top agencies and clients." },
    { title: "Public Speaking", desc: "Develop the confidence to articulate your vision and answer interviews flawlessly." }
  ];

  return (
    <section id="programs" className="py-24 relative border-t border-slate-100 overflow-hidden">
      
      {/* Background Image - LESS BLURRY, CLEAN OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-white">
        <img 
          src="/jma-background.png" 
          alt="Background" 
          className="w-full h-full object-cover object-center opacity-90 scale-105"
        />
        {/* Clean white overlay so text is readable without blurring the image */}
        <div className="absolute inset-0 bg-white/80" />
        
        {/* TOP FADE: Melts smoothly from the About section */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
        
        {/* BOTTOM FADE: Melts smoothly into the Events section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Page Header */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-amber-500 mb-5 border border-slate-200 shadow-sm">
          <Briefcase className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">What We Do</h2>
        <p className="text-slate-700 font-medium text-[13px] md:text-sm mx-auto leading-relaxed max-w-xl">
          We offer comprehensive training and development programs designed to build leaders, influencers, and role models capable of making a positive impact.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.08)] hover:border-rose-200/60 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-50 transition-colors border border-slate-100 shadow-inner">
                <CheckCircle2 className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
              </div>
              <h3 className="font-serif text-[16px] font-bold text-slate-900 mb-2 leading-tight">{service.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/95 backdrop-blur-xl rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left border border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="relative z-10">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-2">Looking for Talent Management?</h3>
            <p className="text-slate-600 font-medium text-[13px] max-w-xl leading-relaxed">We also provide event coordination, creative arts development, and fashion show production.</p>
          </div>
          <a 
            href="/#events" 
            className="relative z-10 bg-slate-900 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-amber-500 transition-colors whitespace-nowrap shadow-md flex items-center justify-center gap-2"
          >
            Explore Events <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
      </div>
    </section>
  );
}
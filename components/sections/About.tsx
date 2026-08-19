"use client";
import React from "react";
import { Award, Eye, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND - Locked in place for a premium parallax effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/main-bg.jpg" 
          alt="Background" 
          className="fixed inset-0 w-full h-screen object-cover object-center"
        />
        {}
        {/* Removed blur completely and reduced white wash for a crisp look */}
        <div className="fixed inset-0 bg-white/30" /> 
      </div>

      {}
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Main Header */}
        <div className="flex justify-center mb-12">
          <div className="max-w-2xl w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
              <Award className="w-6 h-6 text-rose-500" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3 drop-shadow-sm">
              About Juron Models Academy
            </h2>
            <p className="text-slate-700 text-[13px] md:text-sm leading-relaxed max-w-xl mx-auto drop-shadow-sm font-medium">
              More than just an academy. We equip aspiring models with the confidence, discipline, and practical skills required to excel globally.
            </p>
          </div>
        </div>

        {}
        {/* Vision & Mission Cards - Scaled Down */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-5 border border-amber-100">
              <Eye className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-[13px]">
              To become East Africa's leading modeling and talent development academy, recognized globally for producing top-tier brand ambassadors and creative professionals.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 border border-rose-100">
              <Target className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-[13px]">
              To identify, mentor, train, and promote talented individuals by providing world-class coaching, exposure, and a platform to launch their careers in the fashion and entertainment industry.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
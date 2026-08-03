import React from "react";
import { Eye, Target, Award } from "lucide-react";

export default function About() {
  const values = [
    "Professionalism", "Excellence", "Discipline", "Confidence", "Integrity", 
    "Creativity", "Diversity & Inclusion", "Innovation", "Leadership", "Community Impact"
  ];

  return (
    <section id="about" className="bg-white pt-24 pb-16 relative border-t border-slate-100 overflow-hidden">
      
      {/* Page Header */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-rose-100 shadow-sm">
            <Award className="w-6 h-6 text-rose-500" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">About Juron Models Academy</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            More than just an academy. We equip aspiring models with the confidence, discipline, and practical skills required to excel globally.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 border border-amber-200 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm font-medium">
              To become East Africa's leading modeling and talent development academy, producing internationally competitive models, pageant winners, and creative professionals.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-5 border border-rose-200 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm font-medium">
              To identify, mentor, train, and promote talented individuals by providing professional modeling education, leadership development, and opportunities that transform passion into successful careers.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center bg-slate-50 rounded-[32px] p-8 md:p-12 relative overflow-hidden border border-slate-100">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-100/50 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-100/50 rounded-full blur-[80px] pointer-events-none" />
          
          <h3 className="font-serif relative z-10 text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">Our Core Values</h3>
          <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {values.map((value, idx) => (
              <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all cursor-default">
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
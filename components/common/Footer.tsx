"use client";
import React from "react";
import { Users, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-rose-100/50 blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="lg:col-span-2">
            <a href="/#home" className="flex items-center gap-3 mb-5 text-left group inline-flex">
              {/* Added Real Image Logo with styling matching the Navbar */}
              <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white rounded-full shadow-sm border border-slate-200 p-1 flex items-center justify-center">
                <img 
                  src="/jma-logo.png" 
                  alt="Juron Models Academy Logo" 
                  className="w-full h-full object-contain scale-90"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('footer-logo-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div id="footer-logo-fallback" className="hidden w-full h-full bg-gradient-to-br from-rose-400 to-amber-500 rounded-full items-center justify-center text-white font-black tracking-widest text-[8px]">
                  JMA
                </div>
              </div>
              <span className="font-serif font-bold text-lg text-slate-900 tracking-tight">Juron Models Academy</span>
            </a>
            <p className="text-slate-500 text-xs leading-relaxed max-w-md mb-5">
              We believe talent should be a tool for positive social transformation. Through mentorship, outreach programs, and community partnerships, we empower young people to become confident, responsible, and impactful members of society.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 cursor-pointer transition-all shadow-sm">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 cursor-pointer transition-all shadow-sm">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-[10px]">Platform</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li><a href="/#home" className="hover:text-rose-600 transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-rose-600 transition-colors">About Us</a></li>
              <li><a href="/#programs" className="hover:text-rose-600 transition-colors">Programs</a></li>
              <li><a href="/#events" className="hover:text-rose-600 transition-colors">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-[10px]">Partnership Target</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li className="hover:text-amber-600 transition-colors cursor-pointer">Government & NGOs</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer">Fashion Designers</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer">Media & Tourism</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer">Hospitality Industry</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-widest text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} Juron Models Academy. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
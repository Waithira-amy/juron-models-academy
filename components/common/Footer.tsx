"use client";
import React from "react";
import { Users, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl pt-10 pb-6 border-t border-white/60 relative overflow-hidden z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      
      {/* Subtle ambient glow to blend with the page */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-rose-200/40 blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 text-left group inline-flex">
              <div className="relative w-9 h-9 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white/90 rounded-full shadow-sm border border-white p-1 flex items-center justify-center">
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
                <div id="footer-logo-fallback" className="hidden w-full h-full bg-gradient-to-br from-rose-400 to-amber-500 rounded-full items-center justify-center text-white font-black tracking-widest text-[7px]">
                  JMA
                </div>
              </div>
              <span className="font-serif font-bold text-lg text-slate-900 tracking-tight drop-shadow-sm">Juron Models Academy</span>
            </Link>
            <p className="text-slate-800 text-xs leading-relaxed max-w-sm mb-5 font-medium drop-shadow-sm">
              We believe talent should be a tool for positive social transformation. Through mentorship, outreach programs, and community partnerships, we empower young people to become confident, responsible, and impactful members of society.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-slate-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 cursor-pointer transition-all shadow-sm">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 cursor-pointer transition-all shadow-sm">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[10px] drop-shadow-sm">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-800 font-medium">
              <li><Link href="/" className="hover:text-rose-600 transition-colors drop-shadow-sm">Home</Link></li>
              <li><Link href="/about" className="hover:text-rose-600 transition-colors drop-shadow-sm">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-rose-600 transition-colors drop-shadow-sm">Programs</Link></li>
              <li><Link href="/events" className="hover:text-rose-600 transition-colors drop-shadow-sm">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[10px] drop-shadow-sm">Partnership Target</h4>
            <ul className="space-y-2.5 text-xs text-slate-800 font-medium">
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Government & NGOs</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Fashion Designers</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Media & Tourism</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Hospitality Industry</li>
            </ul>
          </div>
        </div>

        {}
        <div className="pt-5 border-t border-slate-400/30 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-widest text-slate-700 font-bold">
          <p className="drop-shadow-sm">© {new Date().getFullYear()} Perfectors Creative Hub. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-slate-900 transition-colors cursor-pointer drop-shadow-sm">Privacy Policy</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer drop-shadow-sm">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
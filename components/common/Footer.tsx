"use client";
import React from "react";
import { Users, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur-md pt-8 pb-6 border-t border-white/40 relative overflow-hidden z-10 shadow-lg">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3 text-left group inline-flex">
              <div className="relative w-8 h-8 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white/90 rounded-full shadow-sm border border-white/50 p-1 flex items-center justify-center">
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
              <span className="font-serif font-bold text-base text-slate-900 tracking-tight drop-shadow-sm">Juron Models Academy</span>
            </Link>
            
            <p className="text-slate-800 text-[11px] leading-relaxed max-w-md mb-4 font-medium drop-shadow-sm">
              We believe talent should be a tool for positive social transformation. Through mentorship, outreach programs, and community partnerships, we empower young people to become confident, responsible, and impactful members of society.
            </p>
            
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-white/60 border border-white flex items-center justify-center text-slate-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 cursor-pointer transition-all shadow-sm">
                <Users className="w-3 h-3" />
              </div>
              <div className="w-7 h-7 rounded-full bg-white/60 border border-white flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 cursor-pointer transition-all shadow-sm">
                <HeartHandshake className="w-3 h-3" />
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-widest text-[9px] drop-shadow-sm">Platform</h4>
            <ul className="space-y-2 text-[11px] text-slate-800 font-medium">
              <li><Link href="/" className="hover:text-rose-600 transition-colors drop-shadow-sm">Home</Link></li>
              <li><Link href="/about" className="hover:text-rose-600 transition-colors drop-shadow-sm">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-rose-600 transition-colors drop-shadow-sm">Programs</Link></li>
              <li><Link href="/events" className="hover:text-rose-600 transition-colors drop-shadow-sm">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2.5 uppercase tracking-widest text-[9px] drop-shadow-sm">Partnerships</h4>
            <ul className="space-y-2 text-[11px] text-slate-800 font-medium">
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Government & NGOs</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Fashion Designers</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Media & Tourism</li>
              <li className="hover:text-amber-600 transition-colors cursor-pointer drop-shadow-sm">Hospitality Industry</li>
            </ul>
          </div>
        </div>

        {}
        <div className="pt-4 border-t border-white/40 flex flex-col md:flex-row items-center justify-between gap-3 text-[8px] uppercase tracking-widest text-slate-700 font-bold">
          <p className="drop-shadow-sm">© {new Date().getFullYear()} Perfectors Creative Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-rose-600 transition-colors cursor-pointer drop-shadow-sm">Privacy Policy</span>
            <span className="hover:text-rose-600 transition-colors cursor-pointer drop-shadow-sm">Terms of Service</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
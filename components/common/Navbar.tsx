"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  /* STREAMING_CHUNK:Initializing scroll listeners... */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/team", label: "The Team" },
    { href: "/programs", label: "Programs" },
    { href: "/events", label: "Events" },
    { href: "/voting", label: "Voting" }
  ];

  /* STREAMING_CHUNK:Configuring dynamic styling variables... */
  const isScrolledBg = isScrolled;
  const isDarkText = isScrolled || pathname !== "/";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolledBg ? "bg-white/95 backdrop-blur-md shadow-sm py-2 md:py-3 border-b border-slate-200" : "bg-transparent py-4 md:py-5"}`}>
      
      {/* Container switches to flex-col on mobile so the logo sits on top of the links */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 md:w-10 md:h-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white rounded-full shadow-md border border-slate-100 p-2 flex items-center justify-center">
            <img 
              src="/jma-logo.png" 
              alt="Juron Models Academy Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div id="logo-fallback" className="hidden w-full h-full bg-slate-900 rounded-full items-center justify-center text-white font-bold tracking-widest shadow-md text-[9px]">
              JMA
            </div>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className={`font-serif font-semibold text-lg md:text-xl leading-none tracking-tight transition-colors drop-shadow-md ${isDarkText ? "text-slate-900 group-hover:text-rose-600" : "text-white group-hover:text-amber-400"}`}>
              Juron Models
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold mt-1 drop-shadow-md">Academy</span>
          </div>
        </Link>

        {/* Desktop & Mobile Links (Now visible on all screen sizes!) */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-5 md:gap-x-6 text-[10px] md:text-[12px] font-bold uppercase tracking-wider w-full md:w-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 drop-shadow-md ${
                pathname === link.href 
                  ? (isDarkText ? "text-rose-600" : "text-rose-500") 
                  : (isDarkText ? "text-slate-700 hover:text-amber-500" : "text-white/90 hover:text-white")
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button (Hidden on tiny mobile screens to save space since Hero has one, visible on tablets/desktops) */}
        <div className="hidden md:block">
          <Link href="/register" className="bg-gradient-to-r from-rose-500 to-rose-700 text-white px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 transition-all duration-300 inline-block">
            Register Now
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
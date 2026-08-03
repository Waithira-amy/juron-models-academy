"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // UPDATED: Added "/team" to the navigation links!
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/#team", label: "The Team" },
    { href: "/#programs", label: "Programs" },
    { href: "/#events", label: "Events" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || pathname !== "/" ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo - Shrunk slightly for elegance */}
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group text-left">
          <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white rounded-full shadow-md border border-slate-100 p-2 flex items-center justify-center">
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
          <div className="flex flex-col">
            <span className="font-bold text-base leading-none tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors drop-shadow-sm">Juron Models</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold mt-1 drop-shadow-sm">Academy</span>
          </div>
        </Link>

        {/* Desktop Links - Adjusted padding and font sizes */}
        <div className="hidden md:flex items-center gap-6 text-[12px] font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 ${pathname === link.href ? "text-rose-600" : "text-slate-700 hover:text-amber-500"} drop-shadow-sm`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button - Tightened padding */}
        <div className="hidden md:block">
          <Link href="/register" className="bg-gradient-to-r from-rose-500 to-rose-700 text-white px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 transition-all duration-300 inline-block">
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-900 hover:text-rose-600 transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold uppercase tracking-wider text-left pb-4 border-b border-slate-100 ${pathname === link.href ? "text-rose-600" : "text-slate-800 hover:text-amber-500"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-rose-500 to-rose-700 text-white text-center px-6 py-4 rounded-xl text-sm font-bold tracking-widest uppercase mt-2 shadow-md">
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
}
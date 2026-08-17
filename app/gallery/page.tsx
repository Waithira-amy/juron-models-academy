import React from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";

export default function GalleryPage() {
  // Replace these with actual images you want to showcase in the future
  const photos = [
    "/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg",
    "/gallery/4.jpg", "/gallery/5.jpg", "/gallery/6.jpg"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 text-xs font-bold uppercase tracking-wider mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
            <Camera className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight drop-shadow-sm">
            Our Gallery
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A visual showcase of our academy's talent, runway shows, pageants, and creative shoots.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((src, index) => (
            <div key={index} className="aspect-[4/5] relative rounded-[32px] overflow-hidden group bg-slate-200 border border-slate-200 shadow-md">
              {/* Image with fallback styling */}
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image isn't uploaded yet
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100"><svg class="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-xs uppercase tracking-widest font-bold">Coming Soon</span></div>`;
                  }
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
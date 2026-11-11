"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// Array of 25 Images
const GALLERY_IMAGES = [
  { id: 1, src: "/gallery/pic1.jpg", alt: "Crowning Moment" },
  { id: 2, src: "/gallery/pic2.jpg", alt: "Evening Gown Walk" },
  { id: 3, src: "/gallery/pic3.jpg", alt: "Makeup Prep" },
  { id: 4, src: "/gallery/pic4.jpg", alt: "Studio Portrait" },
  { id: 5, src: "/gallery/pic5.jpg", alt: "Mr Machakos Finalists" },
  { id: 6, src: "/gallery/pic6.jpg", alt: "Red Carpet Arrival" },
  { id: 7, src: "/gallery/pic7.jpg", alt: "Designer Wear Showcase" },
  { id: 8, src: "/gallery/pic8.jpg", alt: "Behind the Scenes" },
  { id: 9, src: "/gallery/pic9.jpg", alt: "Outdoor Editorial" },
  { id: 10, src: "/gallery/pic10.jpg", alt: "Award Presentation" },
  { id: 11, src: "/gallery/pic11.jpg", alt: "Swimwear Segment" },
  { id: 12, src: "/gallery/pic12.jpg", alt: "Quick Changes" },
  { id: 13, src: "/gallery/pic13.jpg", alt: "High Fashion Shoot" },
  { id: 14, src: "/gallery/pic14.jpg", alt: "Gala Dinner" },
  { id: 15, src: "/gallery/pic15.jpg", alt: "Stage Choreography" },
  { id: 16, src: "/gallery/pic16.jpg", alt: "Group Rehearsals" },
  { id: 17, src: "/gallery/pic17.jpg", alt: "Brand Ambassador Shoot" },
  { id: 18, src: "/gallery/pic18.jpg", alt: "VIP Section" },
  { id: 19, src: "/gallery/pic19.jpg", alt: "Miss Machakos Walk" },
  { id: 20, src: "/gallery/pic20.jpg", alt: "Final Touches" },
  { id: 21, src: "/gallery/pic21.jpg", alt: "Creative Wear Shoot" },
  { id: 22, src: "/gallery/pic22.jpg", alt: "Afterparty Celebration" },
  { id: 23, src: "/gallery/pic23.jpg", alt: "Top 10 Lineup" },
  { id: 24, src: "/gallery/pic24.jpg", alt: "Hair Styling" },
  { id: 25, src: "/gallery/pic25.jpg", alt: "Winner's Portrait" },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Lightbox Navigation Controls
  const closeLightbox = () => setSelectedIndex(null);
  
  const showNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % GALLERY_IMAGES.length);
    }
  }, [selectedIndex]);

  const showPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  }, [selectedIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedIndex]);

  return (
    <main className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center opacity-20" />
      </div>

      <Navbar />

      <section className="pt-32 pb-24 relative z-10 flex-grow px-6">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-3 bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full shadow-sm">
              Portfolio & Archives
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-6 tracking-tight drop-shadow-sm">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Gallery</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
              Explore the elegance, backstage hustle, and crowning moments of East Africa's premier modeling institution.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {GALLERY_IMAGES.map((image, index) => (
              <div 
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 bg-white"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-serif font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
          
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
            <span className="text-white font-serif text-lg">
              {GALLERY_IMAGES[selectedIndex].alt}
            </span>
            
            <button 
              onClick={closeLightbox}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Prev Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all z-50"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Main Image */}
          <div className="w-full h-full p-4 md:p-20 flex items-center justify-center">
            <img 
              src={GALLERY_IMAGES[selectedIndex].src} 
              alt={GALLERY_IMAGES[selectedIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>

          {/* Next Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all z-50"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="text-white text-xs font-bold font-mono tracking-widest">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </span>
          </div>

        </div>
      )}
    </main>
  );
}
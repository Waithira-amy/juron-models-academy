import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Events from "@/components/sections/Events";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden">
      <Navbar />
      
      <Hero />
      <About />
      <Programs />
      <Events />

      <Footer />
    </main>
  );
}
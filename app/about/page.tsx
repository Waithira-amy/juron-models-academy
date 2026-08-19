import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import About from "@/components/sections/About";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex-grow">
        <About />
      </div>
      <Footer />
    </main>
  );
}
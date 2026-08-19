import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Programs from "@/components/sections/Programs";

export default function ProgramsPage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex-grow">
        <Programs />
      </div>
      <Footer />
    </main>
  );
}
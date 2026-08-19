import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Team from "@/components/sections/Team";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex-grow">
        <Team />
      </div>
      <Footer />
    </main>
  );
}
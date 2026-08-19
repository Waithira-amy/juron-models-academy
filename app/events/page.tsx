import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Events from "@/components/sections/Events";

export default function EventsPage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex-grow">
        <Events />
      </div>
      <Footer />
    </main>
  );
}
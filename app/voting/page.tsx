import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Voting from "@/components/sections/Voting";

export default function VotingPage() {
  return (
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden bg-slate-50">
      <Navbar />
      <div className="flex-grow">
        <Voting />
      </div>
      <Footer />
    </main>
  );
}
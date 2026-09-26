"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Crown, Loader2, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/common/Navbar";

// Define the structure of a nominee
interface Nominee {
  id: string;
  name: string;
  votes: number;
  image: string;
  title: string;
}

// Your original hardcoded list of nominees.
// Ensure the keys exactly match the URL structure you intend to use.
const NOMINEES_DATA: Record<string, Nominee[]> = {
  "machakos-mavoko": [
    { id: "JM1", name: "Eliana Mutuku", votes: 0, image: "/images/nominees/machakos-mavoko/miss/eliana.jpg", title: "Miss" },
    { id: "JM2", name: "Peace Nzilani", votes: 0, image: "/images/nominees/machakos-mavoko/miss/peace.jpg", title: "Miss" },
    { id: "JM3", name: "Abby Ndinda", votes: 0, image: "/images/nominees/machakos-mavoko/miss/abby.jpg", title: "Miss" },
    { id: "JM4", name: "Dave Kioko", votes: 0, image: "/images/nominees/machakos-mavoko/mr/dave.jpg", title: "Mr" },
    { id: "JM5", name: "Ian Musyoka", votes: 0, image: "/images/nominees/machakos-mavoko/mr/ian.jpg", title: "Mr" },
  ],
  "machakos-township": [
    // Add your Township nominees here
  ],
  "machakos-diaspora": [
    // Add your Diaspora nominees here
  ]
};

export default function VotingPage() {
  const params = useParams();
  
  // Safely extract the region and force it to lowercase to match the object keys above
  const rawRegion = params?.region ? String(params.region).toLowerCase() : "";
  
  // Clean up the region name for display purposes (e.g., "Machakos Mavoko")
  const displayCategory = rawRegion.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  // Load the hardcoded nominees for this specific region
  const nominees = NOMINEES_DATA[rawRegion] || [];

  const [activeTitle, setActiveTitle] = useState<string>("Miss");

  // Payment Modal State
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredNominees = nominees.filter(n => n.title === activeTitle);
  const votesToAward = Number(amount) > 0 ? Math.floor(Number(amount) / 10) : 0; 

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNominee || !amount || Number(amount) < 10) return;

    setPaymentStatus("loading");
    
    try {
      const res = await fetch("/api/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: Number(amount),
          nomineeId: selectedNominee.id, 
          nomineeName: selectedNominee.name,
          votes: votesToAward,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("error");
        setErrorMessage(data.error || "Failed to initialize payment");
      }
    } catch (error) {
      setPaymentStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            {displayCategory || "Select Region"}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Select a category below and vote for your favorite candidate to help them secure the crown.
          </p>
        </div>

        {/* Mr & Miss Tabs */}
        {rawRegion && (
          <div className="flex justify-center gap-4 mb-10">
            {["Miss", "Mr"].map((title) => (
              <button
                key={title}
                onClick={() => setActiveTitle(title)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
                  activeTitle === title 
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105" 
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Crown className={`w-4 h-4 ${activeTitle === title ? "text-amber-100" : "text-amber-500"}`} />
                {title} {displayCategory.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* Nominee Grid */}
        {!rawRegion ? (
          <div className="text-center py-20 text-slate-400 bg-white rounded-3xl border border-slate-200">
            Please select a region to view nominees.
          </div>
        ) : filteredNominees.length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-white rounded-3xl border border-slate-200">
            No nominees found for {activeTitle} {displayCategory} yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.map((nominee) => (
              <div key={nominee.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                  <img src={nominee.image} alt={nominee.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Code: {nominee.id}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl text-slate-900 mb-1">{nominee.name}</h3>
                <p className="text-amber-600 font-black text-sm mb-4">{nominee.votes.toLocaleString()} Votes</p>
                
                <button 
                  onClick={() => setSelectedNominee(nominee)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Vote for {nominee.name.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STK Push Payment Modal */}
      {selectedNominee && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => { setSelectedNominee(null); setPaymentStatus("idle"); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              ✕
            </button>

            {paymentStatus === "success" ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-900 mb-2">Check Your Phone</h2>
                <p className="text-slate-500 mb-6">An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the vote.</p>
                <button 
                  onClick={() => { setSelectedNominee(null); setPaymentStatus("idle"); }}
                  className="w-full bg-slate-100 text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Vote {selectedNominee.name}</h2>
                  <p className="text-slate-500 text-sm mt-1">1 Vote = 10 Ksh</p>
                </div>

                <form onSubmit={handleVoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">M-Pesa Phone Number</label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="tel" 
                        required
                        placeholder="07XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Amount to Pay (Ksh)</label>
                    <input 
                      type="number" 
                      required
                      min="10"
                      placeholder="e.g. 50"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {Number(amount) >= 10 && (
                      <p className="text-emerald-600 text-xs font-bold mt-2">
                        ✓ This will award {votesToAward} votes
                      </p>
                    )}
                  </div>

                  {paymentStatus === "error" && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={paymentStatus === "loading" || Number(amount) < 10}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-bold py-4 rounded-xl transition-colors mt-2 flex justify-center items-center gap-2"
                  >
                    {paymentStatus === "loading" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      `Pay Ksh ${amount || 0} via M-Pesa`
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
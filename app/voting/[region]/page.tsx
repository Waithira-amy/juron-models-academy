"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Crown, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/common/Navbar";

export default function VotingPage() {
  const params = useParams();
  const rawRegion = params.region as string;
  
  // Decodes the URL slug
  const activeCategory = decodeURIComponent(rawRegion)
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Machakos Mavoko", "Machakos- Mavoko")
    .replace("Machakos Diaspora", "Machakos- Diaspora");

  const [nominees, setNominees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTitle, setActiveTitle] = useState<string>("Miss");

  // Payment Modal State
  const [selectedNominee, setSelectedNominee] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [votes, setVotes] = useState<number | "">(1);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const votePackages = [10, 50, 100, 200, 500, 1000];
  const totalAmount = typeof votes === "number" ? Math.max(1, votes) * 10 : 10;

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await fetch('/api/dashboard', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          // Dynamic filter that is more forgiving with spacing
          const regionNominees = data.nominees.filter((n: any) => 
            (n.category || "").toLowerCase().includes(activeCategory.toLowerCase().split("-")[0])
          );
          setNominees(regionNominees);
        }
      } catch (error) {
        console.error("Error fetching nominees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNominees();
  }, [activeCategory]);

  const filteredNominees = nominees.filter(n => n.title === activeTitle);

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNominee) return;

    const finalVotes = typeof votes === "number" && votes > 0 ? votes : 1;
    const finalAmount = finalVotes * 10;

    setPaymentStatus("loading");
    
    try {
      const res = await fetch("/api/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: finalAmount,
          nomineeId: selectedNominee.code,
          nomineeName: selectedNominee.fullName,
          votes: finalVotes,
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
    <main className="min-h-screen bg-zinc-950 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-500 mb-3">
            {activeCategory}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Select a category below and vote for your favorite candidate.
          </p>
        </div>

        {/* Mr & Miss Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {["Miss", "Mr"].map((title) => (
            <button
              key={title}
              onClick={() => setActiveTitle(title)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
                activeTitle === title 
                  ? "bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105" 
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800"
              }`}
            >
              <Crown className={`w-4 h-4 ${activeTitle === title ? "text-zinc-950" : "text-amber-500"}`} />
              {title}
            </button>
          ))}
        </div>

        {/* Nominee Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-amber-500 animate-spin" /></div>
        ) : filteredNominees.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900 rounded-3xl border border-zinc-800">
            No nominees found for {activeTitle} {activeCategory} yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.map((nominee) => (
              <div key={nominee.code} className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-amber-500/5 blur-[50px] rounded-full pointer-events-none" />
                
                <div className="aspect-[4/5] bg-zinc-950 rounded-2xl mb-4 overflow-hidden relative border border-zinc-800">
                  {nominee.photoUrl ? (
                    <img src={nominee.photoUrl} alt={nominee.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-zinc-700 text-4xl">
                      {nominee.fullName.charAt(0)}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 backdrop-blur text-amber-500 border border-amber-500/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {nominee.code}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl text-zinc-100 mb-1 relative z-10">{nominee.fullName}</h3>
                <p className="text-amber-500 font-black text-sm mb-4 relative z-10">{nominee.votes.toLocaleString()} Votes</p>
                
                <button 
                  onClick={() => setSelectedNominee(nominee)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold py-3 rounded-xl transition-colors relative z-10"
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MTA-Style STK Push Payment Modal */}
      {selectedNominee && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />

            <button 
              onClick={() => { setSelectedNominee(null); setPaymentStatus("idle"); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            {paymentStatus === "success" ? (
              <div className="text-center py-6 relative z-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-white mb-2">Check Your Phone</h2>
                <p className="text-zinc-400 mb-6">An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the vote.</p>
                <button 
                  onClick={() => { setSelectedNominee(null); setPaymentStatus("idle"); }}
                  className="w-full bg-zinc-800 text-white font-bold py-3 rounded-xl hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <h1 className="text-2xl font-serif font-bold text-center mb-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                  Cast Your Vote
                </h1>
                <p className="text-zinc-400 text-center mb-6 text-sm">
                  Supporting <span className="text-white font-bold">{selectedNominee.fullName}</span>
                </p>

                <form onSubmit={handleVoteSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., 0712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Select Vote Package
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {votePackages.map((pkg) => (
                        <button
                          key={pkg}
                          type="button"
                          onClick={() => setVotes(pkg)}
                          className={`flex flex-col items-center justify-center py-2 rounded-xl border transition-all duration-300 ${
                            votes === pkg 
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-[1.02]" 
                              : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900"
                          }`}
                        >
                          <span className="text-lg font-bold">{pkg}</span>
                          <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">Votes</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Or Enter Custom Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={votes}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setVotes(isNaN(val) ? "" : val);
                        }}
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 shadow-inner text-lg font-medium"
                        placeholder="Enter custom votes"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-bold uppercase tracking-widest pointer-events-none">
                        Votes
                      </div>
                    </div>
                  </div>

                  {paymentStatus === "error" && (
                    <div className="flex items-center gap-2 bg-rose-950/30 border border-rose-900/50 text-rose-400 p-3 rounded-lg text-sm font-medium">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={paymentStatus === "loading" || typeof votes !== "number" || votes < 1}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)] text-sm tracking-wide uppercase"
                  >
                    {paymentStatus === "loading" ? "Processing..." : `Pay Ksh ${totalAmount} via M-Pesa`}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
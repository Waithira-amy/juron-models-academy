"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Crown, 
  ArrowLeft, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  X, 
  Smartphone, 
  Loader2 
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// --- NOMINEE DATA STORE (Local for now) ---
interface Nominee {
  id: string;
  name: string;
  code: string;
  location: string;
  gender: "mr" | "miss";
  votes: number;
  photoUrl?: string;
}

const REGION_DATA: Record<string, { title: string; subtitle: string; themeColor: string; nominees: Nominee[] }> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    subtitle: "Representing Syokimau, Mlolongo, Athi River, and Mavoko Sub-County",
    themeColor: "rose",
    nominees: [
      { id: "mvk-1", name: "King Masconde", code: "MVK01", location: "Mavoko", gender: "mr", votes: 42 },
      { id: "mvk-2", name: "Emmanuel Dennis", code: "MVK02", location: "Syokimau", gender: "mr", votes: 35 },
      { id: "mvk-3", name: "Abigael Mbula Kioko", code: "MVK03", location: "Mavoko", gender: "miss", votes: 89 },
      { id: "mvk-4", name: "Jemimah Mutuku Musenya", code: "MVK04", location: "Mlolongo / Mavoko", gender: "miss", votes: 114 },
      { id: "mvk-5", name: "Everlyne Musyoki", code: "MVK05", location: "Athi River", gender: "miss", votes: 76 }
    ]
  },
  township: {
    title: "Mr & Miss Machakos - Township",
    subtitle: "Representing Machakos Town, Machakos University, and Central Environs",
    themeColor: "amber",
    nominees: [
      { id: "twn-1", name: "Kennedy Muasa", code: "TWN01", location: "Machakos", gender: "mr", votes: 58 },
      { id: "twn-2", name: "Bruno Brook", code: "TWN02", location: "Machakos", gender: "mr", votes: 64 },
      { id: "twn-3", name: "Fidel Mutuku", code: "TWN03", location: "Machakos", gender: "mr", votes: 92 },
      { id: "twn-4", name: "Benjamin Kimanthi", code: "TWN04", location: "Machakos", gender: "mr", votes: 47 },
      { id: "twn-5", name: "Shalom Mwendwa", code: "TWN05", location: "Machakos Township", gender: "miss", votes: 142 },
      { id: "twn-6", name: "Marrion Atieno Juma", code: "TWN06", location: "Machakos University", gender: "miss", votes: 125 },
      { id: "twn-7", name: "Whitney Kwamboka", code: "TWN07", location: "Machakos Township", gender: "miss", votes: 88 },
      { id: "twn-8", name: "Reena Akinyi Odhiambo", code: "TWN08", location: "Machakos Township", gender: "miss", votes: 73 },
      { id: "twn-9", name: "Dorcas Kimeu Muuo", code: "TWN09", location: "Machakos Township", gender: "miss", votes: 65 },
      { id: "twn-10", name: "Claire Lucy Wanjiku", code: "TWN10", location: "Machakos Township", gender: "miss", votes: 91 },
      { id: "twn-11", name: "Faith Jeptum", code: "TWN11", location: "Machakos Township", gender: "miss", votes: 84 },
      { id: "twn-12", name: "Rachael Kamutu Matheka", code: "TWN12", location: "Machakos Township", gender: "miss", votes: 79 },
      { id: "twn-13", name: "Mutanu Mbuvi", code: "TWN13", location: "Machakos Township", gender: "miss", votes: 53 },
      { id: "twn-14", name: "Mutuku Irene Mutindi", code: "TWN14", location: "Machakos Township", gender: "miss", votes: 61 },
      { id: "twn-15", name: "Milan Njeri Murimi", code: "TWN15", location: "Machakos", gender: "miss", votes: 48 },
      { id: "twn-16", name: "Mevine Truphosa", code: "TWN16", location: "Machakos", gender: "miss", votes: 70 },
      { id: "twn-17", name: "Damaris Amina", code: "TWN17", location: "Joska / Machakos", gender: "miss", votes: 59 }
    ]
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    subtitle: "Representing Global & Countrywide Ambassadors Outside Machakos County",
    themeColor: "sky",
    nominees: [
      { id: "dsp-1", name: "Yussuf Abubakar", code: "DSP01", location: "Nakuru", gender: "mr", votes: 38 },
      { id: "dsp-2", name: "Andrew Muema Muthyokavi", code: "DSP02", location: "Nairobi", gender: "mr", votes: 54 },
      { id: "dsp-3", name: "Obi Ifaenyi", code: "DSP03", location: "Mombasa", gender: "mr", votes: 41 },
      { id: "dsp-4", name: "Whitney Kwamboka", code: "DSP04", location: "Nakuru", gender: "miss", votes: 63 },
      { id: "dsp-5", name: "Esther Odikara", code: "DSP05", location: "Nairobi", gender: "miss", votes: 77 },
      { id: "dsp-6", name: "Adah Nabocho", code: "DSP06", location: "Nairobi", gender: "miss", votes: 45 },
      { id: "dsp-7", name: "Jennifer Simon", code: "DSP07", location: "Nairobi", gender: "miss", votes: 82 },
      { id: "dsp-8", name: "Beatrice Ingoka", code: "DSP08", location: "Nairobi", gender: "miss", votes: 51 },
      { id: "dsp-9", name: "Amy Ngunjiri", code: "DSP09", location: "Nairobi", gender: "miss", votes: 94 },
      { id: "dsp-10", name: "Teresia Nduku", code: "DSP10", location: "Embakasi Central", gender: "miss", votes: 59 },
      { id: "dsp-11", name: "Sharon Ingasian", code: "DSP11", location: "Kahawa West", gender: "miss", votes: 36 },
      { id: "dsp-12", name: "Stephanie Saiteyia", code: "DSP12", location: "Kitengela", gender: "miss", votes: 71 },
      { id: "dsp-13", name: "Peggycate", code: "DSP13", location: "Kitengela", gender: "miss", votes: 68 },
      { id: "dsp-14", name: "Miriam Monique", code: "DSP14", location: "Malindi", gender: "miss", votes: 80 }
    ]
  }
};

export default function RegionVotingPage() {
  const params = useParams();
  const rawRegion = typeof params?.region === "string" ? params.region.toLowerCase() : "mavoko";
  const currentRegion = REGION_DATA[rawRegion] ? rawRegion : "mavoko";
  const data = REGION_DATA[currentRegion];

  const [activeTab, setActiveTab] = useState<"mr" | "miss">("miss");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  
  // Modal voting form state
  const [voteCount, setVoteCount] = useState<number>(10);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const VOTE_COST_KES = 10;

  const filteredNominees = data.nominees.filter((nom) => {
    const matchesGender = nom.gender === activeTab;
    const matchesSearch = nom.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nom.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSearch;
  });

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number");
    setIsProcessing(true);

    // Simulate STK Push payment trigger (similar to MTA & BUVA)
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedNominee(null);
        setPhoneNumber("");
        setVoteCount(10);
      }, 2500);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen flex flex-col w-full bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Header Area */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Link 
            href="/voting" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" /> All Voting Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="inline-block text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                Official Juron Pageant Portal
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {data.title}
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-xl">
                {data.subtitle}
              </p>
            </div>

            {/* Live Search */}
            <div className="relative min-w-[260px] md:min-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search nominee name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-amber-400 rounded-full py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Sub-Category Switcher: Mr vs Miss */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveTab("miss")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "miss" 
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 scale-105" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              <Crown className="w-4 h-4" /> Miss Machakos ({data.nominees.filter(n => n.gender === "miss").length})
            </button>

            <button
              onClick={() => setActiveTab("mr")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "mr" 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-105" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              <Crown className="w-4 h-4" /> Mr Machakos ({data.nominees.filter(n => n.gender === "mr").length})
            </button>
          </div>
        </div>
      </section>

      {/* Nominees Grid with Generated Posters */}
      <section className="px-6 pb-24 relative z-10 max-w-6xl mx-auto w-full flex-grow">
        {filteredNominees.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl p-8">
            <Crown className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No Nominees Found</h3>
            <p className="text-xs text-slate-400">Try searching with a different name or code.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNominees.map((nominee) => (
              <div 
                key={nominee.id}
                className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
              >
                {/* Generated Campaign Poster Graphic */}
                <div className="relative aspect-[3/4] w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-between p-4 overflow-hidden border-b border-white/10">
                  {/* Subtle Poster Backing Elements */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase">
                      #{nominee.code}
                    </span>
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" /> JMA 2026
                    </span>
                  </div>

                  {/* Centered Poster Silhouette / Portrait */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300 mb-3">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                        {nominee.photoUrl ? (
                          <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-serif font-black text-2xl text-amber-400">
                            {nominee.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-400/90 drop-shadow">
                      Official Nominee
                    </span>
                  </div>

                  {/* Bottom Poster Title Stripe */}
                  <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                    <p className="text-white font-serif font-bold text-sm tracking-tight truncate">
                      {nominee.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      {nominee.location}
                    </p>
                  </div>
                </div>

                {/* Card Action Section */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-slate-900/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Total Votes:</span>
                    <span className="text-amber-400 font-mono font-bold text-sm">{nominee.votes}</span>
                  </div>

                  <button
                    onClick={() => setSelectedNominee(nominee)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Crown className="w-3.5 h-3.5" /> Vote Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MTA / BUVA Style Voting Popup Modal */}
      {selectedNominee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl text-white">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNominee(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 p-2 rounded-full border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            {paymentSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold font-serif mb-2">Vote Request Sent!</h3>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  Please check your phone and enter your M-Pesa PIN to complete {voteCount} votes for <span className="text-amber-400 font-bold">{selectedNominee.name}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVoteSubmit} className="space-y-5">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Cast Your Vote</span>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">{selectedNominee.name}</h3>
                  <p className="text-xs text-slate-400">Code: #{selectedNominee.code} • {selectedNominee.location}</p>
                </div>

                {/* Quick Vote Quantity Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Select Number of Votes:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 50, 100].map((qty) => (
                      <button
                        type="button"
                        key={qty}
                        onClick={() => setVoteCount(qty)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                          voteCount === qty 
                            ? "bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md" 
                            : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30"
                        }`}
                      >
                        +{qty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Quantity Stepper */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-xs text-slate-300 font-medium">Votes:</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setVoteCount(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-lg text-amber-400 min-w-[32px] text-center">{voteCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setVoteCount(prev => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    M-Pesa Phone Number:
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      placeholder="0712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 focus:border-amber-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Total Cost Calculation Banner */}
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3.5 flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-semibold">Total Amount:</span>
                  <span className="text-lg font-serif font-black text-amber-400">
                    KES {(voteCount * VOTE_COST_KES).toLocaleString()}
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending STK Push...
                    </>
                  ) : (
                    `Pay KES ${voteCount * VOTE_COST_KES} via M-Pesa`
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
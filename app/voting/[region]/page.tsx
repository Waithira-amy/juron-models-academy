"use client";
import React, { useState, useEffect } from "react";
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


// Define the Nominee structure based on Supabase
interface Nominee {
  id: string;
  name: string;
  code: string;
  location: string;
  gender: "mr" | "miss";
  votes: number;
  photoUrl: string | null;
  region: string;
}

const REGION_META: Record<string, { title: string; subtitle: string }> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    subtitle: "Representing Syokimau, Mlolongo, Athi River, and Mavoko Sub-County",
  },
  township: {
    title: "Mr & Miss Machakos - Township",
    subtitle: "Representing Machakos Town, Machakos University, and Central Environs",
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    subtitle: "Representing Global & Countrywide Ambassadors Outside Machakos County",
  }
};

export default function RegionVotingPage() {
  const params = useParams();
  const rawRegion = typeof params?.region === "string" ? params.region.toLowerCase() : "mavoko";
  const currentRegion = REGION_META[rawRegion] ? rawRegion : "mavoko";
  const meta = REGION_META[currentRegion];

  // State Management
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mr" | "miss">("miss");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  
  // Modal State
  const [voteCount, setVoteCount] = useState<number>(10);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const VOTE_COST_KES = 10;

  // Fetch from Supabase
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const { data, error } = await supabase
          .from('nominees') // Ensure your table is named 'nominees'
          .select('*');
        
        if (error) throw error;

        if (data) {
          const formattedNominees: Nominee[] = data.map((item: any) => {
            const loc = (item.location || "").toLowerCase();
            
            // Automatic Region Sorting based on our previous logic
            let region = "diaspora"; 
            if (loc.includes("mavoko") || loc.includes("syokimau") || loc.includes("mlolongo") || loc.includes("mulolongo") || loc.includes("athi")) {
              region = "mavoko";
            } else if (loc.includes("machakos") || loc.includes("joska")) {
              region = "township";
            }

            return {
              id: item.id?.toString() || Math.random().toString(),
              name: item.full_name || item.applicant_name || "Unknown",
              code: item.code || `JMA${(item.id || Math.floor(Math.random() * 100)).toString().padStart(3, '0')}`, // Fallback if no code column exists yet
              location: item.location || "Kenya",
              gender: item.gender?.toLowerCase() === "mr" ? "mr" : "miss", // Fallback to miss if undefined
              votes: item.votes || 0,
              photoUrl: item.photo_url || null,
              region: region
            };
          });

          setNominees(formattedNominees);
        }
      } catch (err) {
        console.error("Error fetching nominees:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNominees();
  }, []);

  // Filter the fetched nominees by Region, Gender, and Search Query
  const filteredNominees = nominees.filter((nom) => {
    const matchesRegion = nom.region === currentRegion;
    const matchesGender = nom.gender === activeTab;
    const matchesSearch = nom.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nom.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesGender && matchesSearch;
  });

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number");
    setIsProcessing(true);

    // Simulate STK Push payment trigger (ready to connect to Daraja API)
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedNominee(null);
        setPhoneNumber("");
        setVoteCount(10);
      }, 3000);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen flex flex-col w-full bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Header Area */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
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
                {meta.title}
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-xl">
                {meta.subtitle}
              </p>
            </div>

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

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveTab("miss")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "miss" 
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 scale-105" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              <Crown className="w-4 h-4" /> Miss Machakos
            </button>

            <button
              onClick={() => setActiveTab("mr")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "mr" 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-105" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              <Crown className="w-4 h-4" /> Mr Machakos
            </button>
          </div>
        </div>
      </section>

      {/* Nominees Grid */}
      <section className="px-6 pb-24 relative z-10 max-w-6xl mx-auto w-full flex-grow">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-amber-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Nominees...</p>
          </div>
        ) : filteredNominees.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl p-8">
            <Crown className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No Nominees Found</h3>
            <p className="text-xs text-slate-400">There are currently no nominees matching this search in this region.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNominees.map((nominee) => (
              <div 
                key={nominee.id}
                className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-between p-4 overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase">
                      #{nominee.code}
                    </span>
                    <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" /> JMA 2026
                    </span>
                  </div>

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

                  <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                    <p className="text-white font-serif font-bold text-sm tracking-tight truncate">
                      {nominee.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      {nominee.location}
                    </p>
                  </div>
                </div>

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

      {/* M-Pesa Modal */}
      {selectedNominee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl text-white">
            
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

                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3.5 flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-semibold">Total Amount:</span>
                  <span className="text-lg font-serif font-black text-amber-400">
                    KES {(voteCount * VOTE_COST_KES).toLocaleString()}
                  </span>
                </div>

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
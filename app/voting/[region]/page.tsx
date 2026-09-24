"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { 
  Crown, ArrowLeft, CheckCircle2, Search, Sparkles, X, 
  Smartphone, Loader2, Download, Share2, ChevronRight, User
} from "lucide-react";
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// --- NOMINEE DATA STORE ---
interface Nominee {
  id: string;
  name: string;
  code: string;
  location: string;
  gender: "mr" | "miss";
  votes: number;
  photoUrl?: string;
}

const REGION_DATA: Record<string, { title: string; subtitle: string; theme: any; nominees: Nominee[] }> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    subtitle: "Representing Syokimau, Mlolongo, Athi River, and Mavoko Sub-County",
    theme: {
      avatarBg: "bg-rose-100 border-rose-200",
      avatarText: "text-rose-500",
      hoverBorder: "hover:border-rose-400",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(225,29,72,0.12)]",
      nameHover: "group-hover:text-rose-600",
      pillBg: "bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 group-hover:border-rose-200",
      arrowHover: "group-hover:text-rose-500"
    },
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
    theme: {
      avatarBg: "bg-amber-100 border-amber-200",
      avatarText: "text-amber-500",
      hoverBorder: "hover:border-amber-400",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]",
      nameHover: "group-hover:text-amber-600",
      pillBg: "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-200",
      arrowHover: "group-hover:text-amber-500"
    },
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
    theme: {
      avatarBg: "bg-sky-100 border-sky-200",
      avatarText: "text-sky-500",
      hoverBorder: "hover:border-sky-400",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]",
      nameHover: "group-hover:text-sky-600",
      pillBg: "bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200",
      arrowHover: "group-hover:text-sky-500"
    },
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
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const rawRegion = typeof params?.region === "string" ? params.region.toLowerCase() : "mavoko";
  const currentRegion = REGION_DATA[rawRegion] ? rawRegion : "mavoko";
  const data = REGION_DATA[currentRegion];

  const [activeTab, setActiveTab] = useState<"mr" | "miss">("miss");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  
  const posterRef = useRef<HTMLDivElement>(null);

  const [voteCount, setVoteCount] = useState<number>(10);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const VOTE_COST_KES = 10;

  useEffect(() => {
    const nomineeCode = searchParams?.get('nominee');
    if (nomineeCode) {
      const found = data.nominees.find(n => n.code.toUpperCase() === nomineeCode.toUpperCase());
      if (found) {
        setSelectedNominee(found);
        setActiveTab(found.gender);
      }
    }
  }, [searchParams, data.nominees]);

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

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        closeModal();
      }, 2500);
    }, 2000);
  };

  const handleShare = () => {
    if (!selectedNominee) return;
    const url = `${window.location.origin}${window.location.pathname}?nominee=${selectedNominee.code}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadPoster = async () => {
    if (!posterRef.current || !selectedNominee) return;
    
    try {
      const dataUrl = await htmlToImage.toJpeg(posterRef.current, { 
        quality: 0.95,
        backgroundColor: '#020617' 
      });
      download(dataUrl, `${selectedNominee.name.replace(/\s+/g, '_')}_JMA_Voting_Poster.jpg`);
    } catch (err) {
      console.error('Error downloading poster:', err);
      alert("Oops! Something went wrong while saving the poster. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedNominee(null);
    setPhoneNumber("");
    setVoteCount(10);
    router.replace(`/voting/${currentRegion}`, { scroll: false });
  };

  return (
    <main className="relative min-h-screen flex flex-col w-full bg-slate-50 text-slate-900 overflow-x-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-sm" /> 
      </div>

      <Navbar />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/voting" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors text-xs font-bold uppercase tracking-widest mb-6 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <span className="inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 drop-shadow-sm">
                Official Juron Pageant Portal
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
                {data.title}
              </h1>
              <p className="text-slate-600 text-sm max-w-xl font-medium">
                {data.subtitle}
              </p>
            </div>

            <div className="relative min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search nominee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-full py-3 pl-11 pr-4 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveTab("miss")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "miss" 
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_5px_15px_rgba(225,29,72,0.3)] scale-105 border border-rose-500" 
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
              }`}
            >
              <Crown className="w-4 h-4" /> Miss Machakos ({data.nominees.filter(n => n.gender === "miss").length})
            </button>

            <button
              onClick={() => setActiveTab("mr")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "mr" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_5px_15px_rgba(245,158,11,0.3)] scale-105 border border-amber-500" 
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
              }`}
            >
              <Crown className="w-4 h-4" /> Mr Machakos ({data.nominees.filter(n => n.gender === "mr").length})
            </button>
          </div>
        </div>
      </section>

      {/* Clean, Enhanced Nominee List Grid with Colorful Profile Avatars */}
      <section className="px-6 pb-24 relative z-10 max-w-4xl mx-auto w-full flex-grow">
        {filteredNominees.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <Crown className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Nominees Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredNominees.map((nominee) => (
              <div 
                key={nominee.id}
                onClick={() => {
                  setSelectedNominee(nominee);
                  router.push(`?nominee=${nominee.code}`, { scroll: false });
                }}
                className={`group cursor-pointer bg-white border border-slate-200 ${data.theme.hoverBorder} rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm ${data.theme.hoverShadow} hover:-translate-y-1 overflow-hidden`}
              >
                <div className="flex items-center gap-4 p-4 md:p-5">
                  {/* Colorful Avatar! */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${data.theme.avatarBg} flex items-center justify-center border overflow-hidden flex-shrink-0 transition-colors`}>
                     {nominee.photoUrl ? (
                        <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className={`w-5 h-5 md:w-6 md:h-6 ${data.theme.avatarText}`} />
                      )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-serif font-bold text-base md:text-lg text-slate-900 ${data.theme.nameHover} transition-colors line-clamp-1`}>{nominee.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-transparent transition-colors ${data.theme.pillBg}`}>#{nominee.code}</span>
                      <span className="text-xs text-slate-500 font-medium truncate">{nominee.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pl-4 pr-5 py-4 md:py-5 border-l border-slate-100 bg-slate-50/50 transition-colors h-full">
                  <div className="text-right hidden xs:block">
                    <span className="block text-slate-900 font-bold text-lg leading-tight">{nominee.votes}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Votes</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 ${data.theme.arrowHover} transition-transform group-hover:translate-x-1`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Split-Screen Modal: Light UI outside, Dark Poster inside */}
      {selectedNominee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-100 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-900 bg-white/90 backdrop-blur p-2 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* LEFT SIDE: The Downloadable Poster */}
            <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 relative">
              
              <div 
                ref={posterRef}
                className="relative aspect-[3/4] w-full max-w-[320px] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-between p-5 overflow-hidden border border-slate-800 rounded-2xl shadow-xl"
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-3 py-1.5 rounded-md tracking-widest uppercase">
                    #{selectedNominee.code}
                  </span>
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> JMA 2026
                  </span>
                </div>

                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center mt-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 p-1 shadow-xl mb-4">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      {selectedNominee.photoUrl ? (
                        <img src={selectedNominee.photoUrl} alt={selectedNominee.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-serif font-black text-4xl text-amber-400">
                          {selectedNominee.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-amber-400/90 drop-shadow mb-1">
                    Official Nominee
                  </span>
                  <h3 className="text-white font-serif font-bold text-2xl tracking-tight leading-tight px-2">
                    {selectedNominee.name}
                  </h3>
                </div>

                <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center mt-4">
                  <p className="text-xs text-slate-300 font-medium uppercase tracking-widest">
                    {data.title}
                  </p>
                  <p className="text-[10px] text-amber-400 font-bold uppercase mt-1">
                    Vote at juronmodels.co.ke
                  </p>
                </div>
              </div>

              {/* Share & Download Actions */}
              <div className="flex items-center gap-3 mt-6 w-full max-w-[320px]">
                <button 
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {shareCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  {shareCopied ? "Copied!" : "Copy Link"}
                </button>
                <button 
                  onClick={handleDownloadPoster}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Save
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: M-Pesa Voting Controls */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative bg-white">
              
              {paymentSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Check Your Phone!</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    An M-Pesa prompt has been sent to your phone. Enter your PIN to confirm {voteCount} votes for <span className="text-amber-600 font-bold">{selectedNominee.name}</span>.
                  </p>
                  <button onClick={closeModal} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700 underline underline-offset-4">
                    Return to Nominees
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVoteSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Cast Your Vote</h3>
                    <p className="text-xs text-slate-500 font-medium">Securely support {selectedNominee.name} via M-Pesa.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Select Vote Bundle:
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[1, 5, 10, 50].map((qty) => (
                        <button
                          type="button"
                          key={qty}
                          onClick={() => setVoteCount(qty)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            voteCount === qty 
                              ? "bg-amber-400 text-slate-900 border-amber-400 shadow-md" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 shadow-sm"
                          }`}
                        >
                          +{qty}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm">
                      <span className="text-xs text-slate-600 font-bold ml-2">Custom Amount:</span>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button" 
                          onClick={() => setVoteCount(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-lg text-amber-600 min-w-[32px] text-center">{voteCount}</span>
                        <button 
                          type="button" 
                          onClick={() => setVoteCount(prev => prev + 1)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      M-Pesa Phone Number:
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="0712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <span className="text-sm text-slate-600 font-bold">Total Cost:</span>
                      <span className="text-xl font-serif font-black text-amber-500 drop-shadow-sm">
                        KES {(voteCount * VOTE_COST_KES).toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Initiating Payment...
                        </>
                      ) : (
                        `Pay KES ${voteCount * VOTE_COST_KES} via M-Pesa`
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

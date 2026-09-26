"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Crown, Target, BarChart3, User, ArrowLeft, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function NomineePortal() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [allNominees, setAllNominees] = useState<any[]>([]);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [myCategoryPeers, setMyCategoryPeers] = useState<any[]>([]);

  const TARGET_VOTES = 800;

  // Poll database every 3 seconds ONLY if authenticated
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const fetchLiveVotes = async () => {
      try {
        const res = await fetch('/api/dashboard', { cache: 'no-store' });
        const dbResult = await res.json();
        
        if (dbResult.success && dbResult.nominees) {
          setAllNominees(dbResult.nominees);

          // If they are logged in, update their specific data live
          if (myProfile) {
            const updatedMe = dbResult.nominees.find((n: any) => n.code.toUpperCase() === myProfile.code.toUpperCase());
            if (updatedMe) {
              setMyProfile(updatedMe);
              
              // Filter peers: Must be in the same location category AND same gender title (Mr/Miss)
              const peers = dbResult.nominees
                .filter((n: any) => n.category === updatedMe.category && n.title === updatedMe.title)
                .sort((a: any, b: any) => b.votes - a.votes); // Sort highest votes to lowest
              
              setMyCategoryPeers(peers);
            }
          }
        }
      } catch (err) {
        console.error("Live fetch error", err);
      }
    };

    if (isAuthenticated) {
      fetchLiveVotes();
      interval = setInterval(fetchLiveVotes, 3000);
    }

    return () => clearInterval(interval);
  }, [isAuthenticated, myProfile?.code]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/dashboard', { cache: 'no-store' });
      const dbResult = await res.json();

      if (dbResult.success && dbResult.nominees) {
        const codeUpper = accessCode.trim().toUpperCase();
        const found = dbResult.nominees.find((n: any) => n.code.toUpperCase() === codeUpper);
        
        if (found) {
          setMyProfile(found);
          const peers = dbResult.nominees
            .filter((n: any) => n.category === found.category && n.title === found.title)
            .sort((a: any, b: any) => b.votes - a.votes);
          setMyCategoryPeers(peers);
          setIsAuthenticated(true);
        } else {
          setError("Invalid Nominee Code. Please try again (e.g., MVK01).");
        }
      }
    } catch (err) {
      setError("System error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdinalSuffix = (i: number) => {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/main-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
            <User className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Nominee Portal</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your official code to view your live stats and category leaderboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="e.g. MVK07"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full text-center font-mono text-2xl tracking-widest uppercase bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl py-4 transition-all outline-none"
                required
              />
            </div>
            {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Access Dashboard"}
            </button>
          </form>

          <Link href="/voting" className="inline-flex items-center gap-2 mt-8 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Voting
          </Link>
        </div>
      </main>
    );
  }

  // --- MATH CALCULATIONS ---
  const myRankIndex = myCategoryPeers.findIndex(n => n.code === myProfile.code);
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : 0;
  
  // Formula: (votes / 800) * 100
  const myPercentage = (myProfile.votes * 100) / TARGET_VOTES;
  
  // Cap the visual width bar at 100% so it doesn't break the CSS, but let the text show >100% if they exceed it
  const progressWidth = Math.min(100, myPercentage);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <header className="mb-10">
          <button onClick={() => setIsAuthenticated(false)} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Logout
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-amber-500 text-[10px] font-black uppercase tracking-widest mb-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                Official Candidate Dashboard
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Welcome, <span className="text-amber-400">{myProfile.fullName}</span>
              </h1>
              <p className="text-slate-400 mt-2 text-sm font-medium uppercase tracking-widest">
                {myProfile.title} Machakos - {myProfile.category} | #{myProfile.code}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Live Sync Active</span>
            </div>
          </div>
        </header>

        {/* --- TOP METRIC CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          
          {/* Total Votes */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Your Total Votes</p>
              <p className="text-3xl font-black text-white">{myProfile.votes.toLocaleString()}</p>
            </div>
          </div>

          {/* Current Rank */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Position</p>
              <p className="text-3xl font-black text-white">
                {getOrdinalSuffix(myRank)} <span className="text-sm text-slate-500 font-medium tracking-normal">/ {myCategoryPeers.length}</span>
              </p>
            </div>
          </div>

          {/* Target Progress */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Target Achievement</p>
              <p className="text-3xl font-black text-emerald-400">{myPercentage.toFixed(1)}%</p>
            </div>
          </div>

        </div>

        {/* --- TARGET PROGRESS BAR --- */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Voting Target Progress</h3>
              <p className="text-xs text-slate-400">Your goal is to reach {TARGET_VOTES.toLocaleString()} votes.</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-400">{myProfile.votes.toLocaleString()}</span>
              <span className="text-sm text-slate-500 font-bold"> / {TARGET_VOTES}</span>
            </div>
          </div>
          
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressWidth}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* --- CATEGORY LEADERBOARD --- */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">Live Category Leaderboard</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 bg-slate-950/50">
                  <th className="py-4 px-6 font-bold uppercase tracking-widest text-[10px] w-16">Rank</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-widest text-[10px]">Nominee</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-widest text-[10px] text-right">Votes</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-widest text-[10px] text-right">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {myCategoryPeers.map((peer, index) => {
                  const isMe = peer.code === myProfile.code;
                  const peerPercent = (peer.votes * 100) / TARGET_VOTES;

                  return (
                    <tr key={peer.code} className={`transition-colors ${isMe ? 'bg-amber-500/10' : 'hover:bg-slate-800/30'}`}>
                      <td className="py-4 px-6">
                        {index === 0 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs">1</span>
                        ) : index === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-black text-xs">2</span>
                        ) : index === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs">3</span>
                        ) : (
                          <span className="text-slate-500 font-bold font-mono pl-2">{index + 1}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full border flex-shrink-0 overflow-hidden ${isMe ? 'border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'border-slate-700 bg-slate-800'}`}>
                            {peer.photoUrl ? (
                              <img src={peer.photoUrl} alt={peer.fullName} className="w-full h-full object-cover object-top" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">{peer.fullName.charAt(0)}</div>
                            )}
                          </div>
                          <div>
                            <p className={`font-bold ${isMe ? 'text-amber-400' : 'text-slate-200'}`}>
                              {peer.fullName} {isMe && <span className="ml-2 text-[9px] bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded-sm uppercase tracking-widest">You</span>}
                            </p>
                            <p className="text-[10px] font-mono text-slate-500">{peer.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-white">
                        {peer.votes.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                          peerPercent >= 100 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {peerPercent.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
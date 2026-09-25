"use client";
import React, { useState, useEffect } from "react";
import { Activity, Trophy, Users, Loader2, Filter } from "lucide-react";
import Navbar from "@/components/common/Navbar"; 

interface Nominee {
  id: number;
  fullName: string;
  code: string;
  location: string;
  category?: string;
  votes: number;
  photoUrl: string;
}

export default function LiveDashboard() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const fetchVotes = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      if (data.success) {
        setNominees(data.nominees);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error fetching live votes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
    const interval = setInterval(fetchVotes, 5000);
    return () => clearInterval(interval);
  }, []);

  // Extract unique categories (uses 'category' field if it exists, otherwise falls back to 'location')
  const categories = ["All", ...Array.from(new Set(nominees.map(n => n.category || n.location)))];

  // Filter nominees based on the selected tab
  const filteredNominees = activeCategory === "All" 
    ? nominees 
    : nominees.filter(n => (n.category || n.location) === activeCategory);

  const totalVotes = nominees.reduce((sum, nom) => sum + nom.votes, 0);
  const highestVotes = filteredNominees.length > 0 && filteredNominees[0].votes > 0 ? filteredNominees[0].votes : 1; 

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Live Feed</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900">
              Leaderboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Last synced: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 min-w-[120px] shadow-sm">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Nominees</span>
              </div>
              <span className="text-2xl font-black text-slate-800">{nominees.length}</span>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-4 min-w-[120px] shadow-md text-white">
              <div className="flex items-center gap-2 text-amber-100 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Total Votes</span>
              </div>
              <span className="text-2xl font-black">{totalVotes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          <Filter className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-sm font-medium uppercase tracking-widest">Connecting to Database...</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="space-y-6">
              {filteredNominees.map((nominee, index) => (
                <div key={nominee.code} className="group flex items-center gap-4">
                  
                  {/* Rank */}
                  <div className="w-8 font-black text-xl text-slate-300 text-right">
                    {index === 0 && activeCategory !== "All" ? <Trophy className="w-6 h-6 text-amber-500 inline" /> : `#${index + 1}`}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                    {nominee.photoUrl ? (
                      <img src={nominee.photoUrl} alt={nominee.fullName} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-lg">
                        {nominee.fullName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Details and Bar */}
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">{nominee.fullName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                            {nominee.category || nominee.location}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Code: {nominee.code}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-lg text-amber-600">{nominee.votes.toLocaleString()}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Votes</span>
                      </div>
                    </div>
                    
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          index === 0 && activeCategory !== "All" ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-slate-800'
                        }`}
                        style={{ width: `${Math.max((nominee.votes / highestVotes) * 100, 1)}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredNominees.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  No nominees found in this category.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
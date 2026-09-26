"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/common/Navbar"; // Remove this line if you don't want the navbar on the admin dashboard

export default function AdminDashboard() {
  const [nominees, setNominees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVotes = async () => {
    try {
      // Pulls from your working API route every 5 seconds
      const res = await fetch('/api/dashboard', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setNominees(data.nominees);
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

  // Group them dynamically based on what is ACTUALLY in the DB
  // This ensures NO ONE is ever hidden!
  const groupedCategories: Record<string, any[]> = {};
  
  nominees.forEach((nominee: any) => {
    const cat = nominee.category || "Uncategorized";
    const title = nominee.title || "Nominee";
    const groupName = `${cat} (${title})`; 
    
    if (!groupedCategories[groupName]) {
      groupedCategories[groupName] = [];
    }
    groupedCategories[groupName].push(nominee);
  });

  // Sort the groups alphabetically
  const sortedGroupNames = Object.keys(groupedCategories).sort();

  // Calculate total platform votes and revenue
  const totalPlatformVotes = nominees.reduce((sum: number, n: any) => sum + (n.votes || 0), 0);
  const totalRevenue = totalPlatformVotes * 10;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-amber-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-zinc-400 font-medium tracking-widest uppercase text-sm">Loading Live Feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-zinc-800 pb-6 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Live Polling Active</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">Juron Models Leaderboard</h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-zinc-400 mt-4">
            <p className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
              Total Votes Cast: <span className="text-white font-black text-lg ml-2">{totalPlatformVotes.toLocaleString()}</span>
            </p>
            <p className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
              Estimated Revenue: <span className="text-emerald-400 font-black text-lg ml-2">Ksh {totalRevenue.toLocaleString()}</span>
            </p>
          </div>
        </header>

        {/* Categories Grid */}
        <div className="space-y-12">
          {sortedGroupNames.map((groupName) => (
            <div key={groupName} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">
                {groupName}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="pb-3 font-medium w-16">Rank</th>
                      <th className="pb-3 font-medium">Nominee Name</th>
                      <th className="pb-3 font-medium">Voting Code</th>
                      <th className="pb-3 font-medium text-right">Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCategories[groupName].map((nominee: any, index: number) => (
                      <tr key={nominee.code} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 text-zinc-400 font-medium">
                          {index === 0 ? <span className="text-amber-500">#1</span> : `#${index + 1}`}
                        </td>
                        <td className="py-3 font-semibold text-zinc-200">
                          <div className="flex items-center gap-3">
                            {nominee.photoUrl ? (
                              <img src={nominee.photoUrl} alt={nominee.fullName} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-500">
                                {nominee.fullName.charAt(0)}
                              </div>
                            )}
                            {nominee.fullName}
                          </div>
                        </td>
                        <td className="py-3 text-zinc-500 font-mono text-xs">{nominee.code}</td>
                        <td className="py-3 text-right">
                          <span className={`px-3 py-1 rounded-full font-bold shadow-inner border ${
                            index === 0 
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}>
                            {nominee.votes || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          
          {sortedGroupNames.length === 0 && (
            <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-2xl border-dashed">
              No nominees found. Check Prisma Studio to make sure they are in the Voting table.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
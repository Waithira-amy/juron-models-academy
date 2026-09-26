"use client";
import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, Users } from "lucide-react";

// --- EXACT HARDCODED NOMINEE DATA ---
// This guarantees the dashboard shows everyone in the exact order you set.
const REGION_DATA: Record<string, any> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    nominees: [
      { id: "mvk-1", name: "King Masconde", code: "MVK01", gender: "mr", votes: 0, photoUrl: "/nominees/king-masconde.jpg" },
      { id: "mvk-2", name: "Emmanuel Dennis", code: "MVK02", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-dennis.jpg" },
      { id: "mvk-3", name: "Abigael Mbula Kioko", code: "MVK03", gender: "miss", votes: 0, photoUrl: "/nominees/abigael-mbula-kioko.jpg" },
      { id: "mvk-4", name: "Jemimah Mutuku Musenya", code: "MVK04", gender: "miss", votes: 0, photoUrl: "/nominees/jemimah-mutuku-musenya.jpg" },
      { id: "mvk-5", name: "Everlyne Musyoki", code: "MVK05", gender: "miss", votes: 0, photoUrl: "/nominees/everlyne-musyoki.jpg" }
    ]
  },
  township: {
    title: "Mr & Miss Machakos - Township",
    nominees: [
      { id: "twn-1", name: "Kennedy Muasa", code: "TWN01", gender: "mr", votes: 0, photoUrl: "/nominees/kennedy-muasa.jpg" },
      { id: "twn-2", name: "Bruno Brook", code: "TWN02", gender: "mr", votes: 0, photoUrl: "/nominees/bruno-brook.jpg" },
      { id: "twn-3", name: "Fidel Mutuku", code: "TWN03", gender: "mr", votes: 0, photoUrl: "/nominees/fidel-mutuku.jpg" },
      { id: "twn-4", name: "Benjamin Kimanthi", code: "TWN04", gender: "mr", votes: 0, photoUrl: "/nominees/benjamin-kimanthi.jpg" },
      { id: "twn-5", name: "Shalom Mwendwa", code: "TWN05", gender: "miss", votes: 0, photoUrl: "/nominees/shalom-mwendwa.jpg" },
      { id: "twn-6", name: "Marrion Atieno Juma", code: "TWN06", gender: "miss", votes: 0, photoUrl: "/nominees/marrion-atieno-juma.jpg" },
      { id: "twn-7", name: "Whitney Kwamboka", code: "TWN07", gender: "miss", votes: 0, photoUrl: "/nominees/whitney-kwamboka-township.jpg" },
      { id: "twn-8", name: "Reena Akinyi Odhiambo", code: "TWN08", gender: "miss", votes: 0, photoUrl: "/nominees/reena-akinyi-odhiambo.jpg" },
      { id: "twn-9", name: "Dorcas Kimeu Muuo", code: "TWN09", gender: "miss", votes: 0, photoUrl: "/nominees/dorcas-kimeu-muuo.jpg" },
      { id: "twn-10", name: "Claire Lucy Wanjiku", code: "TWN10", gender: "miss", votes: 0, photoUrl: "/nominees/claire-lucy-wanjiku.jpg" },
      { id: "twn-11", name: "Faith Jeptum", code: "TWN11", gender: "miss", votes: 0, photoUrl: "/nominees/faith-jeptum.jpg" },
      { id: "twn-12", name: "Rachael Kamutu Matheka", code: "TWN12", gender: "miss", votes: 0, photoUrl: "/nominees/rachael-kamutu-matheka.jpg" },
      { id: "twn-13", name: "Mutanu Mbuvi", code: "TWN13", gender: "miss", votes: 0, photoUrl: "/nominees/mutanu-mbuvi.jpg" },
      { id: "twn-14", name: "Mutuku Irene Mutindi", code: "TWN14", gender: "miss", votes: 0, photoUrl: "/nominees/mutuku-irene-mutindi.jpg" },
      { id: "twn-15", name: "Milan Njeri Murimi", code: "TWN15", gender: "miss", votes: 0, photoUrl: "/nominees/milan-njeri-murimi.jpg" },
      { id: "twn-16", name: "Mevine Truphosa", code: "TWN16", gender: "miss", votes: 0, photoUrl: "/nominees/mevine-truphosa.jpg" },
      { id: "twn-17", name: "Damaris Amina", code: "TWN17", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-amina.jpg" }
    ]
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    nominees: [
      { id: "dsp-1", name: "Yussuf Abubakar", code: "DSP01", gender: "mr", votes: 0, photoUrl: "/nominees/yussuf-abubakar.jpg" },
      { id: "dsp-2", name: "Andrew Muema Muthyokavi", code: "DSP02", gender: "mr", votes: 0, photoUrl: "/nominees/andrew-muema-muthyokavi.jpg" },
      { id: "dsp-3", name: "Obi Ifaenyi", code: "DSP03", gender: "mr", votes: 0, photoUrl: "/nominees/obi-ifaenyi.jpg" },
      { id: "dsp-4", name: "Whitney Kwamboka", code: "DSP04", gender: "miss", votes: 0, photoUrl: "/nominees/whitney-kwamboka-diaspora.jpg" },
      { id: "dsp-5", name: "Esther Odikara", code: "DSP05", gender: "miss", votes: 0, photoUrl: "/nominees/esther-odikara.jpg" },
      { id: "dsp-6", name: "Adah Nabocho", code: "DSP06", gender: "miss", votes: 0, photoUrl: "/nominees/adah-nabocho.jpg" },
      { id: "dsp-7", name: "Jennifer Simon", code: "DSP07", gender: "miss", votes: 0, photoUrl: "/nominees/jennifer-simon.jpg" },
      { id: "dsp-8", name: "Beatrice Ingoka", code: "DSP08", gender: "miss", votes: 0, photoUrl: "/nominees/beatrice-ingoka.jpg" },
      { id: "dsp-9", name: "Amy Ngunjiri", code: "DSP09", gender: "miss", votes: 0, photoUrl: "/nominees/amy-ngunjiri.jpg" },
      { id: "dsp-10", name: "Teresia Nduku", code: "DSP10", gender: "miss", votes: 0, photoUrl: "/nominees/teresia-nduku.jpg" },
      { id: "dsp-11", name: "Sharon Ingasian", code: "DSP11", gender: "miss", votes: 0, photoUrl: "/nominees/sharon-ingasian.jpg" },
      { id: "dsp-12", name: "Stephanie Saiteyia", code: "DSP12", gender: "miss", votes: 0, photoUrl: "/nominees/stephanie-saiteyia.jpg" },
      { id: "dsp-13", name: "Peggycate", code: "DSP13", gender: "miss", votes: 0, photoUrl: "/nominees/peggycate.jpg" },
      { id: "dsp-14", name: "Miriam Monique", code: "DSP14", gender: "miss", votes: 0, photoUrl: "/nominees/miriam-monique.jpg" }
    ]
  }
};

export default function AdminDashboard() {
  const [liveData, setLiveData] = useState(REGION_DATA);
  const [globalTotalVotes, setGlobalTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveVotes = async () => {
    try {
      const res = await fetch('/api/dashboard', { cache: 'no-store' });
      const dbResult = await res.json();
      
      if (dbResult.success && dbResult.nominees) {
        // Create a fast lookup map for the real database votes by Code (e.g., MVK01)
        const dbVotesMap = new Map(dbResult.nominees.map((n: any) => [n.code.toUpperCase(), n.votes]));
        
        let newTotalVotes = 0;
        
        // Deep clone the hardcoded REGION_DATA so we don't mutate the original
        const updatedRegionData = JSON.parse(JSON.stringify(REGION_DATA));

        // Inject the live votes into our strict layout
        Object.keys(updatedRegionData).forEach(regionKey => {
          updatedRegionData[regionKey].nominees.forEach((nominee: any) => {
            const liveVotes = dbVotesMap.get(nominee.code.toUpperCase());
            // If the database has votes for this code, update it. Otherwise, keep the hardcoded base.
            if (liveVotes !== undefined) {
              nominee.votes = liveVotes;
            }
            newTotalVotes += nominee.votes;
          });
        });

        setLiveData(updatedRegionData);
        setGlobalTotalVotes(newTotalVotes);
      }
    } catch (error) {
      console.error("Error fetching live votes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on load
    fetchLiveVotes();
    // Poll the database every 5 seconds for new M-Pesa receipts
    const interval = setInterval(fetchLiveVotes, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-amber-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">Loading Live Feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 pb-24 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-slate-800 pb-8 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Live System Active</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            JMA '26 <span className="text-amber-500">Live Leaderboard</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 flex items-center gap-4 flex-1">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Votes</p>
                <p className="text-2xl font-black text-white">{globalTotalVotes.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 flex items-center gap-4 flex-1">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                <p className="text-2xl font-black text-emerald-400">KES {(globalTotalVotes * 10).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Render Each Region Strictly in Order */}
        <div className="space-y-12">
          {Object.entries(liveData).map(([regionKey, region]) => (
            <div key={regionKey} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              
              <div className="bg-slate-950 p-6 border-b border-slate-800">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {region.title}
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 bg-slate-900/50">
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs w-16">Order</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Nominee Details</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Code</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Gender</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs text-right">Votes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {region.nominees.map((nominee: any, index: number) => (
                      <tr key={nominee.code} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="py-4 px-6 text-slate-500 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                              {nominee.photoUrl ? (
                                <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover object-top" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                                  {nominee.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                              {nominee.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md font-mono text-xs font-bold tracking-widest">
                            {nominee.code}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="uppercase text-xs font-bold tracking-widest text-slate-500">
                            {nominee.gender === 'mr' ? 'Mr' : 'Miss'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full font-black text-sm inline-block shadow-inner">
                            {nominee.votes.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
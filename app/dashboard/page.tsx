"use client";
import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, Users, Wallet } from "lucide-react";

const REGION_DATA: Record<string, any> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    nominees: [
      { id: "mvk-1", name: "King Masconde", code: "MVK01", gender: "mr", votes: 0, photoUrl: "/nominees/king-masconde.jpg" },
      { id: "mvk-2", name: "Emmanuel Dennis", code: "MVK02", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-dennis.jpg" },
      { id: "mvk-3", name: "Brian Lokiridi", code: "MVK03", gender: "mr", votes: 0, photoUrl: "/nominees/brian-lokiridi.jpg" },
      { id: "mvk-4", name: "Abigael Mbula Kioko", code: "MVK04", gender: "miss", votes: 0, photoUrl: "/nominees/abigael-mbula-kioko.jpg" },
      { id: "mvk-5", name: "Jemimah Mutuku Musenya", code: "MVK05", gender: "miss", votes: 0, photoUrl: "/nominees/jemimah-mutuku-musenya.jpg" },
      { id: "mvk-6", name: "Everlyne Musyoki", code: "MVK06", gender: "miss", votes: 0, photoUrl: "/nominees/everlyne-musyoki.jpg" },
      { id: "mvk-7", name: "Peggycate", code: "MVK07", gender: "miss", votes: 0, photoUrl: "/nominees/peggycate.jpg" },
      { id: "mvk-8", name: "Stephanie Saiteyia", code: "MVK08", gender: "miss", votes: 0, photoUrl: "/nominees/stephanie-saiteyia.jpg" },
      { id: "mvk-9", name: "Grace Wangui", code: "MVK09", gender: "miss", votes: 0, photoUrl: "/nominees/grace-wangui.jpg" },
      { id: "mvk-10", name: "Bridget Wambui Mugo", code: "MVK10", gender: "miss", votes: 0, photoUrl: "/nominees/bridget-wambui-mugo.jpg" }
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
      { id: "twn-7", name: "Whitney Kwamboka", code: "TWN07", gender: "miss", votes: 0, photoUrl: "/nominees/whitney-kwamboka.jpg" },
      { id: "twn-8", name: "Reena Akinyi Odhiambo", code: "TWN08", gender: "miss", votes: 0, photoUrl: "/nominees/reena-akinyi-odhiambo.jpg" },
      { id: "twn-9", name: "Dorcas Kimeu Muuo", code: "TWN09", gender: "miss", votes: 0, photoUrl: "/nominees/dorcas-kimeu-muuo.jpg" },
      { id: "twn-10", name: "Claire Lucy Wanjiku", code: "TWN10", gender: "miss", votes: 0, photoUrl: "/nominees/claire-lucy-wanjiku.jpg" },
      { id: "twn-11", name: "Faith Jeptum", code: "TWN11", gender: "miss", votes: 0, photoUrl: "/nominees/faith-jeptum.jpg" },
      { id: "twn-12", name: "Rachael Kamutu Matheka", code: "TWN12", gender: "miss", votes: 0, photoUrl: "/nominees/rachael-kamutu-matheka.jpg" },
      { id: "twn-13", name: "Mutanu Mbuvi", code: "TWN13", gender: "miss", votes: 0, photoUrl: "/nominees/mutanu-mbuvi.jpg" },
      { id: "twn-14", name: "Mutuku Irene Mutindi", code: "TWN14", gender: "miss", votes: 0, photoUrl: "/nominees/mutuku-irene-mutindi.jpg" },
      { id: "twn-15", name: "Milan Njeri Murimi", code: "TWN15", gender: "miss", votes: 0, photoUrl: "/nominees/milan-njeri-murimi.jpg" },
      { id: "twn-16", name: "Mevine Truphosa", code: "TWN16", gender: "miss", votes: 0, photoUrl: "/nominees/mevine-truphosa.jpg" },
      { id: "twn-17", name: "Damaris Amina", code: "TWN17", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-amina.jpg" },
      { id: "twn-18", name: "Joy Bernita Kerubo", code: "TWN18", gender: "miss", votes: 0, photoUrl: "/nominees/joy-bernita-kerubo.jpg" },
      { id: "twn-19", name: "Maureen Wambui Karanja", code: "TWN19", gender: "miss", votes: 0, photoUrl: "/nominees/maureen-wambui-karanja.jpg" }
    ]
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    nominees: [
      { id: "dsp-1", name: "Yussuf Abubakar", code: "DSP01", gender: "mr", votes: 0, photoUrl: "/nominees/yussuf-abubakar.jpg" },
      { id: "dsp-2", name: "Andrew Muema Muthyokavi", code: "DSP02", gender: "mr", votes: 0, photoUrl: "/nominees/andrew-muema-muthyokavi.jpg" },
      { id: "dsp-3", name: "Obi Ifaenyi", code: "DSP03", gender: "mr", votes: 0, photoUrl: "/nominees/obi-ifaenyi.jpg" },
      { id: "dsp-4", name: "Esther Odikara", code: "DSP04", gender: "miss", votes: 0, photoUrl: "/nominees/esther-odikara.jpg" },
      { id: "dsp-5", name: "Adah Nabocho", code: "DSP05", gender: "miss", votes: 0, photoUrl: "/nominees/adah-nabocho.jpg" },
      { id: "dsp-6", name: "Jennifer Simon", code: "DSP06", gender: "miss", votes: 0, photoUrl: "/nominees/jennifer-simon.jpg" },
      { id: "dsp-7", name: "Beatrice Ingoka", code: "DSP07", gender: "miss", votes: 0, photoUrl: "/nominees/beatrice-ingoka.jpg" },
      { id: "dsp-8", name: "Amy Ngunjiri", code: "DSP08", gender: "miss", votes: 0, photoUrl: "/nominees/amy-ngunjiri.jpg" },
      { id: "dsp-9", name: "Teresia Nduku", code: "DSP09", gender: "miss", votes: 0, photoUrl: "/nominees/teresia-nduku.jpg" },
      { id: "dsp-10", name: "Sharon Ingasian", code: "DSP10", gender: "miss", votes: 0, photoUrl: "/nominees/sharon-ingasian.jpg" },
      { id: "dsp-11", name: "Miriam Monique", code: "DSP11", gender: "miss", votes: 0, photoUrl: "/nominees/miriam-monique.jpg" },
      { id: "dsp-12", name: "Roseline Atieno Otieno", code: "DSP12", gender: "miss", votes: 0, photoUrl: "/nominees/roseline-atieno-otieno.jpg" }
    ]
  }
};

export default function AdminDashboard() {
  const [liveData, setLiveData] = useState(REGION_DATA);
  const [globalTotalVotes, setGlobalTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveVotes = async () => {
    try {
      const res = await fetch('/api/dashboard', { 
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const dbResult = await res.json();
      
      if (dbResult.success && dbResult.nominees) {
        const dbVotesMap = new Map(dbResult.nominees.map((n: any) => [n.code.toUpperCase(), n.votes]));
        let newTotalVotes = 0;
        
        const updatedRegionData = JSON.parse(JSON.stringify(REGION_DATA));

        Object.keys(updatedRegionData).forEach(regionKey => {
          updatedRegionData[regionKey].nominees.forEach((nominee: any) => {
            const liveVotes = dbVotesMap.get(nominee.code.toUpperCase());
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
    fetchLiveVotes();
    const interval = setInterval(fetchLiveVotes, 3000);
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

  // --- DEDUCTION MATH ---
  const rawVotes = globalTotalVotes;
  const grossRevenue = rawVotes * 10;
  // 20% off the total gross revenue, then subtract 7000 flat fee
  const amountAfterDeductions = Math.max(0, (grossRevenue * 0.8) - 7000); 

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 pb-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Live System Active</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
            JMA '26 <span className="text-amber-500">Live Leaderboard</span>
          </h1>
          
          {/* New 3-Card Financial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Total Raw Votes */}
            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Votes</p>
                <p className="text-2xl font-black text-white">{rawVotes.toLocaleString()}</p>
              </div>
            </div>
            
            {/* 2. Gross Revenue */}
            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Gross Revenue</p>
                <p className="text-2xl font-black text-emerald-400">KES {grossRevenue.toLocaleString()}</p>
              </div>
            </div>

            {/* 3. Amount After Deductions */}
            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-lg shadow-purple-900/20">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 flex-shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Amount after deductions</p>
                <p className="text-2xl font-black text-purple-400">KES {amountAfterDeductions.toLocaleString()}</p>
              </div>
            </div>

          </div>
        </header>

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
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs w-16">#</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Nominee Details</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Code</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs">Category</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-widest text-xs text-right">Votes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {region.nominees.map((nominee: any, index: number) => (
                      <tr key={nominee.code} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="py-4 px-6 text-slate-500 font-medium">{index + 1}</td>
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
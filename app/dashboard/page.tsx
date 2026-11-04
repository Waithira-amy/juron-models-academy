"use client";
import React, { useState, useEffect } from "react";
import { Loader2, TrendingUp, Users, Wallet } from "lucide-react";

const REGION_DATA: Record<string, any> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    nominees: [
      { id: "mvk-2", name: "Emmanuel Dennis", code: "MVK02", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-dennis.jpg", originalCategory: "mavoko" },
      { id: "mvk-3", name: "Brian Lokiridi", code: "MVK03", gender: "mr", votes: 0, photoUrl: "/nominees/brian-lokiridi.jpg", originalCategory: "mavoko" },
      { id: "mvk-4", name: "Abigael Mbula Kioko", code: "MVK04", gender: "miss", votes: 0, photoUrl: "/nominees/abigael-mbula-kioko.jpg", originalCategory: "mavoko" },
      { id: "mvk-5", name: "Jemimah Mutuku Musenya", code: "MVK05", gender: "miss", votes: 0, photoUrl: "/nominees/jemimah-mutuku-musenya.jpg", originalCategory: "mavoko" },
      { id: "mvk-6", name: "Everlyne Musyoki", code: "MVK06", gender: "miss", votes: 0, photoUrl: "/nominees/everlyne-musyoki.jpg", originalCategory: "mavoko" },
      { id: "mvk-7", name: "Peggycate", code: "MVK07", gender: "miss", votes: 0, photoUrl: "/nominees/peggycate.jpg", originalCategory: "mavoko" },
      { id: "mvk-8", name: "Stephanie Saiteyia", code: "MVK08", gender: "miss", votes: 0, photoUrl: "/nominees/stephanie-saiteyia.jpg", originalCategory: "mavoko" },
      { id: "mvk-9", name: "Grace Wangui", code: "MVK09", gender: "miss", votes: 0, photoUrl: "/nominees/grace-wangui.jpg", originalCategory: "mavoko" },
      { id: "mvk-10", name: "Bridget Wambui Mugo", code: "MVK10", gender: "miss", votes: 0, photoUrl: "/nominees/bridget-wambui-mugo.jpg", originalCategory: "mavoko" },
      { id: "mvk-11", name: "Roseline Atieno Otieno", code: "MVK11", gender: "miss", votes: 0, photoUrl: "/nominees/roseline-atieno-otieno.jpg", originalCategory: "mavoko" },
      { id: "mvk-12", name: "Chelsea Tanya", code: "MVK12", gender: "miss", votes: 0, photoUrl: "/nominees/chelsea-tanya.jpg", originalCategory: "mavoko" },
      { id: "mvk-13", name: "Tonny Musembi", code: "MVK13", gender: "mr", votes: 0, photoUrl: "/nominees/tonny-musembi.jpg", originalCategory: "mavoko" },
      { id: "mvk-14", name: "Emmanuel Noel", code: "MVK14", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-noel.jpg", originalCategory: "mavoko" },
      { id: "mvk-15", name: "Pashile Arsene", code: "MVK15", gender: "mr", votes: 0, photoUrl: "/nominees/pashile-arsene.jpg", originalCategory: "mavoko" },
      { id: "mvk-16", name: "Josiah Lamo", code: "MVK16", gender: "mr", votes: 0, photoUrl: "/nominees/josiah-lamo.jpg", originalCategory: "mavoko" }
    ]
  },
  township: {
    title: "Mr & Miss Machakos - Township",
    nominees: [
      { id: "twn-1", name: "Kennedy Muasa", code: "TWN01", gender: "mr", votes: 0, photoUrl: "/nominees/kennedy-muasa.jpg", originalCategory: "township" },
      { id: "twn-2", name: "Bruno Brook", code: "TWN02", gender: "mr", votes: 0, photoUrl: "/nominees/bruno-brook.jpg", originalCategory: "township" },
      { id: "twn-3", name: "Fidel Mutuku", code: "TWN03", gender: "mr", votes: 0, photoUrl: "/nominees/fidel-mutuku.jpg", originalCategory: "township" },
      { id: "twn-4", name: "Benjamin Kimanthi", code: "TWN04", gender: "mr", votes: 0, photoUrl: "/nominees/benjamin-kimanthi.jpg", originalCategory: "township" },
      { id: "twn-5", name: "Shalom Mwendwa", code: "TWN05", gender: "miss", votes: 0, photoUrl: "/nominees/shalom-mwendwa.jpg", originalCategory: "township" },
      { id: "twn-6", name: "Marrion Atieno Juma", code: "TWN06", gender: "miss", votes: 0, photoUrl: "/nominees/marrion-atieno-juma.jpg", originalCategory: "township" },
      { id: "twn-7", name: "Whitney Kwamboka", code: "TWN07", gender: "miss", votes: 0, photoUrl: "/nominees/whitney-kwamboka.jpg", originalCategory: "township" },
      { id: "twn-8", name: "Reena Akinyi Odhiambo", code: "TWN08", gender: "miss", votes: 0, photoUrl: "/nominees/reena-akinyi-odhiambo.jpg", originalCategory: "township" },
      { id: "twn-9", name: "Dorcas Kimeu Muuo", code: "TWN09", gender: "miss", votes: 0, photoUrl: "/nominees/dorcas-kimeu-muuo.jpg", originalCategory: "township" },
      { id: "twn-10", name: "Claire Lucy Wanjiku", code: "TWN10", gender: "miss", votes: 0, photoUrl: "/nominees/claire-lucy-wanjiku.jpg", originalCategory: "township" },
      { id: "twn-11", name: "Faith Jeptum", code: "TWN11", gender: "miss", votes: 0, photoUrl: "/nominees/faith-jeptum.jpg", originalCategory: "township" },
      { id: "twn-12", name: "Rachael Kamutu Matheka", code: "TWN12", gender: "miss", votes: 0, photoUrl: "/nominees/rachael-kamutu-matheka.jpg", originalCategory: "township" },
      { id: "twn-13", name: "Mutanu Mbuvi", code: "TWN13", gender: "miss", votes: 0, photoUrl: "/nominees/mutanu-mbuvi.jpg", originalCategory: "township" },
      { id: "twn-14", name: "Mutuku Irene Mutindi", code: "TWN14", gender: "miss", votes: 0, photoUrl: "/nominees/mutuku-irene-mutindi.jpg", originalCategory: "township" },
      { id: "twn-15", name: "Milan Njeri Murimi", code: "TWN15", gender: "miss", votes: 0, photoUrl: "/nominees/milan-njeri-murimi.jpg", originalCategory: "township" },
      { id: "twn-16", name: "Mevine Truphosa", code: "TWN16", gender: "miss", votes: 0, photoUrl: "/nominees/mevine-truphosa.jpg", originalCategory: "township" },
      { id: "twn-17", name: "Damaris Amina", code: "TWN17", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-amina.jpg", originalCategory: "township" },
      { id: "twn-18", name: "Joy Bernita Kerubo", code: "TWN18", gender: "miss", votes: 0, photoUrl: "/nominees/joy-bernita-kerubo.jpg", originalCategory: "township" },
      { id: "twn-19", name: "Maureen Wambui Karanja", code: "TWN19", gender: "miss", votes: 0, photoUrl: "/nominees/maureen-wambui-karanja.jpg", originalCategory: "township" },
      { id: "twn-20", name: "Mitchell Omollo", code: "TWN20", gender: "miss", votes: 0, photoUrl: "/nominees/mitchell-omollo.jpg", originalCategory: "township" },
      { id: "twn-21", name: "Kylian Robert Wambua", code: "TWN21", gender: "mr", votes: 0, photoUrl: "/nominees/kylian-robert-wambua.jpg", originalCategory: "township" },
      { id: "twn-22", name: "Gloria Mumbua", code: "TWN22", gender: "miss", votes: 0, photoUrl: "/nominees/gloria-mumbua.jpg", originalCategory: "township" },
      { id: "twn-23", name: "Almer Awino", code: "TWN23", gender: "miss", votes: 0, photoUrl: "/nominees/almer-awino.jpg", originalCategory: "township" },
      { id: "twn-24", name: "Mercy Kavuu", code: "TWN24", gender: "miss", votes: 0, photoUrl: "/nominees/mercy-kavuu.jpg", originalCategory: "township" },
      { id: "twn-25", name: "Vanessa Awour", code: "TWN25", gender: "miss", votes: 0, photoUrl: "/nominees/vanessa-awour.jpg", originalCategory: "township" },
      { id: "twn-26", name: "Alloys Chacha", code: "TWN26", gender: "mr", votes: 0, photoUrl: "/nominees/alloys-chacha.jpg", originalCategory: "township" },
      { id: "twn-27", name: "Angela Anselma Nzisa", code: "TWN27", gender: "miss", votes: 0, photoUrl: "/nominees/angela-anselma-nzisa.jpg", originalCategory: "township" },
      { id: "twn-28", name: "Zora kinuthia", code: "TWN28", gender: "miss", votes: 0, photoUrl: "/nominees/zora-kinuthia.jpg", originalCategory: "township" }
    ]
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    nominees: [
      { id: "dsp-1", name: "Yussuf Abubakar", code: "DSP01", gender: "mr", votes: 0, photoUrl: "/nominees/yussuf-abubakar.jpg", originalCategory: "diaspora" },
      { id: "dsp-2", name: "Andrew Muema Muthyokavi", code: "DSP02", gender: "mr", votes: 0, photoUrl: "/nominees/andrew-muema-muthyokavi.jpg", originalCategory: "diaspora" },
      { id: "dsp-3", name: "Obi Ifaenyi", code: "DSP03", gender: "mr", votes: 0, photoUrl: "/nominees/obi-ifaenyi.jpg", originalCategory: "diaspora" },
      { id: "dsp-4", name: "Esther Odikara", code: "DSP04", gender: "miss", votes: 0, photoUrl: "/nominees/esther-odikara.jpg", originalCategory: "diaspora" },
      { id: "dsp-5", name: "Adah Nabocho", code: "DSP05", gender: "miss", votes: 0, photoUrl: "/nominees/adah-nabocho.jpg", originalCategory: "diaspora" },
      { id: "dsp-6", name: "Jennifer Simon", code: "DSP06", gender: "miss", votes: 0, photoUrl: "/nominees/jennifer-simon.jpg", originalCategory: "diaspora" },
      { id: "dsp-7", name: "Beatrice Ingoka", code: "DSP07", gender: "miss", votes: 0, photoUrl: "/nominees/beatrice-ingoka.jpg", originalCategory: "diaspora" },
      { id: "dsp-9", name: "Teresia Nduku", code: "DSP09", gender: "miss", votes: 0, photoUrl: "/nominees/teresia-nduku.jpg", originalCategory: "diaspora" },
      { id: "dsp-10", name: "Sharon Ingasian", code: "DSP10", gender: "miss", votes: 0, photoUrl: "/nominees/sharon-ingasian.jpg", originalCategory: "diaspora" },
      { id: "dsp-11", name: "Miriam Monique", code: "DSP11", gender: "miss", votes: 0, photoUrl: "/nominees/miriam-monique.jpg", originalCategory: "diaspora" },
      { id: "dsp-12", name: "Ian Juma", code: "DSP12", gender: "mr", votes: 0, photoUrl: "/nominees/ian-juma.jpg", originalCategory: "diaspora" },
      { id: "dsp-13", name: "BRILLIANT ATYANG", code: "DSP13", gender: "miss", votes: 0, photoUrl: "/nominees/brilliant-atyang.jpg", originalCategory: "diaspora" },
      { id: "dsp-14", name: "Cosmus maithya", code: "DSP14", gender: "mr", votes: 0, photoUrl: "/nominees/cosmus-maithya.jpg", originalCategory: "diaspora" },
      { id: "dsp-15", name: "Monique Miriam", code: "DSP15", gender: "miss", votes: 0, photoUrl: "/nominees/monique-miriam.jpg", originalCategory: "diaspora" },
      { id: "dsp-17", name: "Mereline khayati", code: "DSP17", gender: "miss", votes: 0, photoUrl: "/nominees/mereline-khayati.jpg", originalCategory: "diaspora" },
      { id: "dsp-18", name: "Cecilia Wairimu", code: "DSP18", gender: "miss", votes: 0, photoUrl: "/nominees/cecilia-wairimu.jpg", originalCategory: "diaspora" },
      { id: "dsp-20", name: "Annet wanyagah", code: "DSP20", gender: "miss", votes: 0, photoUrl: "/nominees/annet-wanyagah.jpg", originalCategory: "diaspora" },
      { id: "dsp-21", name: "Kelvin Ooltetia", code: "DSP21", gender: "mr", votes: 0, photoUrl: "/nominees/kelvin-ooltetia.jpg", originalCategory: "diaspora" }
    ]
  },
  mwala: {
    title: "Mr & Miss Machakos - Mwala",
    nominees: [
      { id: "mwl-1", name: "Cecilliah Nzilani", code: "MWL01", gender: "miss", votes: 0, photoUrl: "/nominees/cecilliah-nzilani.jpg", originalCategory: "mwala" },
      { id: "mwl-2", name: "Rabbeca Nduku Maingi", code: "MWL02", gender: "miss", votes: 0, photoUrl: "/nominees/rabbeca-nduku-maingi.jpg", originalCategory: "mwala" },
      { id: "mwl-3", name: "Darius Kaindi", code: "MWL03", gender: "mr", votes: 0, photoUrl: "/nominees/darius-kaindi.jpg", originalCategory: "mwala" },
      { id: "mwl-4", name: "Catherine Mutuku", code: "MWL04", gender: "miss", votes: 0, photoUrl: "/nominees/catherine-mutuku.jpg", originalCategory: "mwala" },
      { id: "mwl-5", name: "Diana Ndeda", code: "MWL05", gender: "miss", votes: 0, photoUrl: "/nominees/diana-ndeda.jpg", originalCategory: "mwala" },
      { id: "mwl-6", name: "Keziah Monicah Mutaiti", code: "MWL06", gender: "miss", votes: 0, photoUrl: "/nominees/keziah-monicah-mutaiti.jpg", originalCategory: "mwala" },
      { id: "mwl-7", name: "Trevis Kamau", code: "MWL07", gender: "mr", votes: 0, photoUrl: "/nominees/trevis-kamau.jpg", originalCategory: "mwala" },
      { id: "mwl-8", name: "Bradley Geoffrey", code: "MWL08", gender: "mr", votes: 0, photoUrl: "/nominees/bradley-geoffrey.jpg", originalCategory: "mwala" },
      { id: "mwl-9", name: "Zora Kinuthia", code: "MWL09", gender: "miss", votes: 0, photoUrl: "/nominees/zora-kinuthia.jpg", originalCategory: "mwala" }
    ]
  },
  kangundo: {
    title: "Mr & Miss Machakos - Kangundo",
    nominees: [
      { id: "kan-1", name: "Praise Deborah Kithunga", code: "KAN01", gender: "miss", votes: 0, photoUrl: "/nominees/praise-deborah-kithunga.jpg", originalCategory: "kangundo" },
      { id: "kan-2", name: "Joshua Kennedy", code: "KAN02", gender: "mr", votes: 0, photoUrl: "/nominees/joshua-kennedy.jpg", originalCategory: "kangundo" },
      { id: "kan-3", name: "Winnie Mutheu", code: "KAN03", gender: "miss", votes: 0, photoUrl: "/nominees/winnie-mutheu.jpg", originalCategory: "kangundo" },
      { id: "kan-4", name: "Margaret Wanja Mwangi", code: "KAN04", gender: "miss", votes: 0, photoUrl: "/nominees/margaret-wanja-mwangi.jpg", originalCategory: "kangundo" },
      { id: "kan-5", name: "Kuki Japhet", code: "KAN05", gender: "miss", votes: 0, photoUrl: "/nominees/kuki-japhet.jpg", originalCategory: "kangundo" },
      { id: "kan-6", name: "Gladys Ngatha", code: "KAN06", gender: "miss", votes: 0, photoUrl: "/nominees/gladys-ngatha.jpg", originalCategory: "kangundo" },
      { id: "kan-7", name: "Joy Wanjeri", code: "KAN07", gender: "miss", votes: 0, photoUrl: "/nominees/joy-wanjeri-real.jpg", originalCategory: "kangundo" },
      { id: "kan-8", name: "Tracy Sitatian", code: "KAN08", gender: "miss", votes: 0, photoUrl: "/nominees/tracy-sitatian.jpg", originalCategory: "kangundo" },
      { id: "kan-9", name: "Rama Hassan", code: "KAN09", gender: "mr", votes: 0, photoUrl: "/nominees/rama-hassan.jpg", originalCategory: "kangundo" }
    ]
  },
  environs: {
    title: "Mr & Miss Machakos - Environs (200+ Votes)",
    nominees: [
      { id: "env-1", name: "Kelvin", code: "ENV01", gender: "mr", votes: 0, photoUrl: "/nominees/kelvin.jpg", originalCategory: "environs" },
      { id: "env-2", name: "Samuel Karingithi Kagiri", code: "ENV02", gender: "mr", votes: 0, photoUrl: "/nominees/samuel-karingithi-kagiri.jpg", originalCategory: "environs" },
      { id: "env-3", name: "Glorious Nyakara", code: "ENV03", gender: "miss", votes: 0, photoUrl: "/nominees/glorious-nyakara.jpg", originalCategory: "environs" },
      { id: "env-4", name: "Damaris Helen Akoth", code: "ENV04", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-helen-akoth.jpg", originalCategory: "environs" },
      { id: "env-5", name: "Daissy Anne Ogot", code: "ENV05", gender: "miss", votes: 0, photoUrl: "/nominees/daissy-anne-ogot.jpg", originalCategory: "environs" },
      { id: "env-6", name: "Boniface Kipngetich", code: "ENV06", gender: "mr", votes: 0, photoUrl: "/nominees/boniface-kipngetich.jpg", originalCategory: "environs" },
      { id: "env-7", name: "Mereline Khayati", code: "ENV07", gender: "miss", votes: 0, photoUrl: "/nominees/mereline-khayati.jpg", originalCategory: "environs" },
      { id: "env-8", name: "Sherleen Jepkoech", code: "ENV08", gender: "miss", votes: 0, photoUrl: "/nominees/sherleen-jepkoech.jpg", originalCategory: "environs" },
      { id: "env-9", name: "Wilson Muange Kyalo", code: "ENV09", gender: "mr", votes: 0, photoUrl: "/nominees/wilson-muange-kyalo.jpg", originalCategory: "environs" },
      { id: "env-10", name: "Albert Otieno", code: "ENV10", gender: "mr", votes: 0, photoUrl: "/nominees/albert-otieno.jpg", originalCategory: "environs" },
      { id: "env-11", name: "Allan Otieno Omondi", code: "ENV11", gender: "mr", votes: 0, photoUrl: "/nominees/allan-otieno-omondi.jpg", originalCategory: "environs" },
      { id: "env-12", name: "Emmanuel Ochieng Japheth", code: "ENV12", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-ochieng-japheth.jpg", originalCategory: "environs" },
      { id: "env-13", name: "Isaac Muuo Siloni", code: "ENV13", gender: "mr", votes: 0, photoUrl: "/nominees/isaac-muuo-siloni.jpg", originalCategory: "environs" },
      { id: "env-14", name: "Brian Mwema", code: "ENV14", gender: "mr", votes: 0, photoUrl: "/nominees/brian-mwema.jpg", originalCategory: "environs" },
      { id: "env-15", name: "Diana Neema", code: "ENV15", gender: "miss", votes: 0, photoUrl: "/nominees/diana-neema.jpg", originalCategory: "environs" },
      { id: "env-16", name: "Victor Mwangi Kahenia", code: "ENV16", gender: "mr", votes: 0, photoUrl: "/nominees/victor-mwangi-kahenia.jpg", originalCategory: "environs" },
      { id: "env-17", name: "Mirriam Mutheu Kiio", code: "ENV17", gender: "miss", votes: 0, photoUrl: "/nominees/mirriam-mutheu-kiio.jpg", originalCategory: "environs" },
      { id: "env-18", name: "Stephen Gekonge", code: "ENV18", gender: "mr", votes: 0, photoUrl: "/nominees/stephen-gekonge.jpg", originalCategory: "environs" },
      { id: "env-19", name: "Jasmine Waithira Natalyia", code: "ENV19", gender: "miss", votes: 0, photoUrl: "/nominees/jasmine-waithira-natalyia.jpg", originalCategory: "environs" }
    ]
  },
  popularity: {
    title: "Mr & Miss Popularity (500+ Votes)",
    nominees: [] // Populated dynamically
  }
};

// Compile master list for easy filtering
const ALL_NOMINEES = [
  ...REGION_DATA.mavoko.nominees,
  ...REGION_DATA.township.nominees,
  ...REGION_DATA.diaspora.nominees,
  ...REGION_DATA.mwala.nominees,
  ...REGION_DATA.kangundo.nominees,
  ...REGION_DATA.environs.nominees
];

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
        
        // Correct global total calculation
        const newTotalVotes = dbResult.nominees.reduce((sum: number, n: any) => sum + (n.votes || 0), 0);
        
        // Map database votes to the global list
        const updatedGlobalList = ALL_NOMINEES.map(nom => {
          const dbMatch = dbResult.nominees.find((n: any) => n.code.toUpperCase() === nom.code.toUpperCase());
          return { ...nom, votes: dbMatch ? dbMatch.votes : 0 };
        });
        
        const updatedRegionData = JSON.parse(JSON.stringify(REGION_DATA));

        // 1. POPULARITY TIER: Anyone with 500+ votes
        updatedRegionData.popularity.nominees = updatedGlobalList
          .filter(nom => nom.votes >= 500)
          .map(nom => ({ ...nom, votes: nom.votes - 500 }))
          .sort((a, b) => b.votes - a.votes);

        // 2. ENVIRONS TIER: Original Environs (< 500) PLUS Anyone Else (200 to 499)
        updatedRegionData.environs.nominees = updatedGlobalList
          .filter(nom => {
            if (nom.originalCategory === "environs") return nom.votes < 500;
            return nom.votes >= 200 && nom.votes < 500;
          })
          .sort((a, b) => b.votes - a.votes);

        // 3. BASE TIERS: Only original members with < 200 votes
        ['mavoko', 'township', 'diaspora', 'mwala', 'kangundo'].forEach(regionKey => {
          updatedRegionData[regionKey].nominees = updatedGlobalList
            .filter(nom => nom.originalCategory === regionKey && nom.votes < 200)
            .sort((a, b) => b.votes - a.votes);
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

  const rawVotes = globalTotalVotes;
  const grossRevenue = rawVotes * 10;
  const amountAfterDeductions = (grossRevenue * 0.8) - 7000; 

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
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Votes</p>
                <p className="text-2xl font-black text-white">{rawVotes.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Gross Revenue</p>
                <p className="text-2xl font-black text-emerald-400">KES {grossRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-lg shadow-purple-900/20">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 flex-shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Amount after deductions</p>
                <p className={`text-2xl font-black ${amountAfterDeductions < 0 ? 'text-red-400' : 'text-purple-400'}`}>
                  KES {amountAfterDeductions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-12">
          {Object.entries(liveData).map(([regionKey, region]) => (
            <div key={regionKey} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {region.title}
                </h2>
                <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {region.nominees.length} Nominees
                </span>
              </div>
              
              {region.nominees.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
                  {regionKey === 'popularity' ? "No one has reached 500 votes yet." 
                  : regionKey === 'environs' ? "No one has reached 200 votes yet." 
                  : "All nominees have advanced to higher tiers!"}
                </div>
              ) : (
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
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                                  {nominee.name}
                                </span>
                                {regionKey === 'popularity' || regionKey === 'environs' ? (
                                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                                    From: {nominee.originalCategory}
                                  </span>
                                ) : null}
                              </div>
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
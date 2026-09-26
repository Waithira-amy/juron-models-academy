"use client";
import React, { useState, useEffect, useRef } from "react";
import { Crown, Globe, Ticket, Users, Star, X, Smartphone, Loader2, CheckCircle2, Download } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export default function EventTickets() {
  const [selectedTicket, setSelectedTicket] = useState<{ id: string, name: string, price: number } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTicketCode, setCurrentTicketCode] = useState<string | null>(null);
  const [ticketStatus, setTicketStatus] = useState<"PENDING" | "PAID">("PENDING");
  
  const ticketRef = useRef<HTMLDivElement>(null);

  const openTicketModal = (prefix: string, name: string, price: number) => {
    const uniqueId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSelectedTicket({ id: uniqueId, name, price });
    setCurrentTicketCode(uniqueId);
    setPhoneNumber("");
    setTicketStatus("PENDING");
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setCurrentTicketCode(null);
  };

  // Poll database for webhook success
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (selectedTicket && ticketStatus === "PENDING" && currentTicketCode) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/tickets?code=${currentTicketCode}`, { cache: 'no-store' });
          const data = await res.json();
          if (data.success && data.ticket?.status === "PAID") {
            setTicketStatus("PAID");
            clearInterval(interval);
          }
        } catch (e) {
          console.error("Polling error");
        }
      }, 3000); 
    }
    
    return () => clearInterval(interval);
  }, [selectedTicket, ticketStatus, currentTicketCode]);

  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !selectedTicket) return;
    setIsProcessing(true);

    try {
      const response = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: selectedTicket.price,
          nomineeId: selectedTicket.id, 
          nomineeName: selectedTicket.name,
          votes: 1
        })
      });

      const resData = await response.json();
      if (!resData.success) {
        alert("Payment initialization failed.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current || !currentTicketCode) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(ticketRef.current, { quality: 1.0 });
      download(dataUrl, `JMA-${currentTicketCode}.jpg`);
    } catch (err) {
      alert("Failed to download ticket. Please take a screenshot instead.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden flex-grow">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
          <div className="fixed inset-0 bg-white/40 backdrop-blur-[2px]" /> 
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="flex justify-center mb-10">
            <div className="max-w-xl w-full text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-200">
                <Ticket className="w-6 h-6 text-amber-500" />
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-slate-900 mb-4 drop-shadow-sm">
                Event <span className="text-amber-600">Tickets</span>
              </h1>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Crown Ticket */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                <h3 className="font-bold text-lg text-slate-900 mb-6">Crown Ticket <br/><span className="text-[10px] text-slate-500 uppercase">For Students</span></h3>
                <div className="mb-6"><span className="text-3xl font-black">500</span><span className="text-sm font-bold text-slate-500 ml-1">KES</span></div>
                
                <button onClick={() => openTicketModal("TKT-CRN", "Crown Ticket", 500)} className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase mt-auto">Buy Ticket</button>
              </div>

              {/* Royal Ticket */}
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative flex flex-col md:scale-105 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                <h3 className="font-bold text-lg text-white mb-6">Royal Ticket <br/><span className="text-[10px] text-slate-400 uppercase">For Guests</span></h3>
                <div className="mb-6"><span className="text-4xl font-black text-white">1,000</span><span className="text-sm font-bold text-slate-400 ml-1">KES</span></div>
                
                <button onClick={() => openTicketModal("TKT-RYL", "Royal Ticket", 1000)} className="w-full py-3.5 bg-amber-500 text-slate-900 rounded-xl text-xs font-black uppercase mt-auto">Buy Ticket</button>
              </div>

              {/* Omni Ticket */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative flex flex-col opacity-90">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-300" />
                <h3 className="font-bold text-lg text-slate-900 mb-6">Omni Ticket <br/><span className="text-[10px] text-slate-500 uppercase">Partners</span></h3>
                <div className="mb-6"><span className="text-2xl font-black text-slate-400 uppercase">Invite Only</span></div>
                <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold uppercase mt-auto">Closed</button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
              <button onClick={closeModal} className="absolute top-4 right-4 z-50 bg-slate-100 p-2 rounded-full"><X className="w-4 h-4" /></button>
              <div className="bg-slate-50 p-6 md:p-8 flex flex-col items-center justify-center text-center">
                
                {ticketStatus === "PAID" ? (
                  <div className="flex flex-col items-center w-full">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Ticket Generated!</h3>
                    <p className="text-[11px] text-slate-500 mb-5 font-bold uppercase tracking-widest text-rose-500">
                      Download and show at the gate
                    </p>
                    
                    {/* The Downloadable Ticket Card */}
                    <div 
                      ref={ticketRef}
                      className="w-full bg-slate-950 rounded-2xl overflow-hidden relative shadow-lg mb-6 border border-slate-800"
                    >
                      {/* Ticket Header */}
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
                        <span className="font-black text-slate-950 uppercase tracking-widest text-xs">JMA '26</span>
                        <Crown className="w-4 h-4 text-slate-900" />
                      </div>
                      
                      {/* Ticket Body */}
                      <div className="p-6 bg-slate-900 flex flex-col items-center border-b-2 border-dashed border-slate-700">
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1">Official Entry Pass</span>
                        <h2 className="text-2xl font-serif font-black text-white mb-4">{selectedTicket.name}</h2>
                        
                        <div className="bg-white p-3 rounded-xl">
                           <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentTicketCode}`} alt="Ticket QR" className="w-32 h-32" />
                        </div>
                      </div>

                      {/* Ticket Footer */}
                      <div className="bg-slate-950 p-4 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Ticket ID</span>
                        <span className="font-mono text-xl font-black tracking-widest text-slate-200">
                          {currentTicketCode}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={downloadTicket}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_5px_15px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <Download className="w-4 h-4" /> Download Ticket
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePurchaseSubmit} className="w-full text-left space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-slate-900">Buy {selectedTicket.name}</h3>
                      <p className="text-xs text-slate-500">Pay KES {selectedTicket.price} securely via M-Pesa.</p>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-3">M-Pesa Number:</label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="0712345678" className="w-full border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm" required />
                      </div>
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full py-4 bg-emerald-500 text-white rounded-xl text-sm font-bold uppercase">
                      {isProcessing ? "Waiting for PIN..." : `Pay KES ${selectedTicket.price}`}
                    </button>
                    {isProcessing && <p className="text-xs text-amber-600 font-bold text-center animate-pulse">Check your phone and enter your PIN...</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
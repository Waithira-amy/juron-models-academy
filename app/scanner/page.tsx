"use client";
import React, { useState } from "react";
import { QrCode, CheckCircle, XCircle, ShieldCheck } from "lucide-react";

export default function TicketScanner() {
  const [ticketCode, setTicketCode] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode) return;
    
    setIsScanning(true);
    setResult(null);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketCode: ticketCode.trim().toUpperCase() }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, message: "Connection Error" });
    } finally {
      setIsScanning(false);
      setTicketCode(""); // Clear input for the next guest
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-serif font-bold">JMA Gate Scanner</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Official Gate Protocol</p>
        </div>

        <form onSubmit={handleScan} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Ticket Code (e.g., TKT-CRN-1234)"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-center font-mono text-lg uppercase focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-600"
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={isScanning}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            {isScanning ? "Verifying..." : <><QrCode className="w-5 h-5" /> Verify Ticket</>}
          </button>
        </form>

        {result && (
          <div className={`mt-8 p-6 rounded-2xl flex flex-col items-center text-center border ${result.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            {result.success ? <CheckCircle className="w-12 h-12 text-emerald-500 mb-3" /> : <XCircle className="w-12 h-12 text-red-500 mb-3" />}
            <p className={`font-bold text-lg ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
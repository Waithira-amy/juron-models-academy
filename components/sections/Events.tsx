"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Crown,
  Ticket,
  X,
  Smartphone,
  Loader2,
  CheckCircle2,
  Download,
  Heart,
  KeyRound,
  User,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

function EventTicketsContent() {
  const searchParams = useSearchParams();
  const affiliateCode = searchParams?.get("ref");

  const [selectedTicket, setSelectedTicket] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(500);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTicketCode, setCurrentTicketCode] = useState<string | null>(
    null
  );
  const [ticketStatus, setTicketStatus] = useState<"PENDING" | "PAID">(
    "PENDING"
  );

  const ticketRef = useRef<HTMLDivElement>(null);

  const isOmniTicket = selectedTicket?.id.startsWith("TKT-OMN") ?? false;
  const isSupportTicket = selectedTicket?.price === 0 && !isOmniTicket;

  const openTicketModal = (prefix: string, name: string, price: number) => {
    const uniqueId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSelectedTicket({ id: uniqueId, name, price });
    setCurrentTicketCode(uniqueId);
    setPhoneNumber("");
    setRecipientName("");
    setInviteCode("");
    setCustomAmount(500);
    setTicketStatus("PENDING");
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setCurrentTicketCode(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      selectedTicket &&
      ticketStatus === "PENDING" &&
      currentTicketCode &&
      !currentTicketCode.startsWith("TKT-OMN")
    ) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/tickets?code=${currentTicketCode}`, {
            cache: "no-store",
          });
          const data = await res.json();
          if (data.success && data.ticket?.status === "PAID") {
            setTicketStatus("PAID");
            clearInterval(interval);
          }
        } catch {
          console.error("Polling error");
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedTicket, ticketStatus, currentTicketCode]);

  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !selectedTicket || !currentTicketCode) return;

    if (isOmniTicket) {
      if (!recipientName.trim()) {
        return alert(
          "Please enter the name of the person receiving this ticket."
        );
      }
      if (!inviteCode.trim()) {
        return alert("Please enter the invite passcode.");
      }

      setIsProcessing(true);
      try {
        const response = await fetch("/api/tickets/omni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticketCode: currentTicketCode,
            phone: phoneNumber,
            recipientName: recipientName.trim(),
            inviteCode: inviteCode.trim(),
          }),
        });

        const resData = await response.json();
        if (resData.success) {
          setTicketStatus("PAID");
        } else {
          alert(resData.error || "Failed to generate Omni ticket.");
        }
      } catch {
        alert("Network error while generating ticket.");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    const finalAmount =
      selectedTicket.price === 0 ? customAmount : selectedTicket.price;
    if (finalAmount < 1) return alert("Minimum contribution is 1 KES");

    setIsProcessing(true);

    try {
      const response = await fetch("/api/stkpush/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: finalAmount,
          ticketType: selectedTicket.name,
          quantity: 1,
          affiliateCode: affiliateCode,
        }),
      });

      const resData = await response.json();
      if (!resData.success) {
        alert(
          "Payment initialization failed: " +
            (resData.error || "Unknown error")
        );
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current || !currentTicketCode) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(ticketRef.current, {
        quality: 1.0,
      });
      const safeFileName = recipientName.trim()
        ? `JMA-${currentTicketCode}-${recipientName
            .trim()
            .replace(/\s+/g, "_")}.jpg`
        : `JMA-${currentTicketCode}.jpg`;
      download(dataUrl, safeFileName);
    } catch {
      alert("Failed to download ticket. Please take a screenshot instead.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden flex-grow">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/main-bg.jpg"
            alt="Background"
            className="fixed inset-0 w-full h-screen object-cover object-center"
          />
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

          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Crown Ticket */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                <h3 className="font-bold text-lg text-slate-900 mb-6">
                  Crown Ticket <br />
                  <span className="text-[10px] text-slate-500 uppercase">
                    For Students
                  </span>
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-black">500</span>
                  <span className="text-sm font-bold text-slate-500 ml-1">
                    KES
                  </span>
                </div>
                <button
                  onClick={() => openTicketModal("TKT-CRN", "Crown Ticket", 500)}
                  className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase mt-auto"
                >
                  Buy Ticket
                </button>
              </div>

              {/* Royal Ticket */}
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative flex flex-col md:scale-105 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                <h3 className="font-bold text-lg text-white mb-6">
                  Royal Ticket <br />
                  <span className="text-[10px] text-slate-400 uppercase">
                    For Guests
                  </span>
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">1,000</span>
                  <span className="text-sm font-bold text-slate-400 ml-1">
                    KES
                  </span>
                </div>
                <button
                  onClick={() =>
                    openTicketModal("TKT-RYL", "Royal Ticket", 1000)
                  }
                  className="w-full py-3.5 bg-amber-500 text-slate-900 rounded-xl text-xs font-black uppercase mt-auto shadow-[0_5px_15px_rgba(245,158,11,0.3)]"
                >
                  Buy Ticket
                </button>
              </div>

              {/* Support / Contribution Ticket */}
              <div className="bg-rose-50 rounded-3xl p-8 border border-rose-200 shadow-md relative flex flex-col overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Heart className="w-24 h-24 text-rose-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                <h3 className="font-bold text-lg text-rose-950 mb-6 relative z-10">
                  Support Fund <br />
                  <span className="text-[10px] text-rose-500 uppercase font-black">
                    Friends & Family
                  </span>
                </h3>
                <div className="mb-6 relative z-10">
                  <span className="text-2xl font-black text-rose-700 uppercase tracking-widest">
                    Any Amount
                  </span>
                </div>
                <button
                  onClick={() =>
                    openTicketModal("TKT-SUP", "Support Contribution", 0)
                  }
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase mt-auto shadow-md transition-colors relative z-10"
                >
                  Contribute
                </button>
              </div>

              {/* Omni Ticket */}
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-lg relative flex flex-col overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <h3 className="font-bold text-lg text-slate-900 mb-6">
                  Omni Ticket <br />
                  <span className="text-[10px] text-emerald-600 uppercase font-bold">
                    Partners & VIPs
                  </span>
                </h3>
                <div className="mb-6">
                  <span className="text-2xl font-black text-emerald-700 uppercase tracking-wider">
                    Complimentary
                  </span>
                </div>
                <button
                  onClick={() => openTicketModal("TKT-OMN", "Omni Ticket", -1)}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase mt-auto shadow-md transition-colors"
                >
                  Generate Pass
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh]">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-50 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="bg-slate-50 p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                {ticketStatus === "PAID" ? (
                  <div className="flex flex-col items-center w-full">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 mb-1" />
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {isOmniTicket ? "Complimentary Pass Ready!" : "Success!"}
                    </h3>
                    <p className="text-[10px] mb-3 font-bold uppercase tracking-widest text-emerald-600">
                      {isOmniTicket
                        ? "Official Partner & VIP Access"
                        : "Thank you for your support"}
                    </p>

                    {/* Compact Downloadable Ticket Card */}
                    <div
                      ref={ticketRef}
                      className="w-full bg-slate-950 rounded-2xl overflow-hidden relative shadow-lg mb-3.5 border border-slate-800"
                    >
                      <div
                        className={`px-4 py-2.5 flex items-center justify-between ${
                          isOmniTicket
                            ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                            : isSupportTicket
                              ? "bg-gradient-to-r from-rose-500 to-rose-600"
                              : "bg-gradient-to-r from-amber-500 to-amber-600"
                        }`}
                      >
                        <span className="font-black text-slate-950 uppercase tracking-widest text-xs">
                          JMA '26
                        </span>
                        {isSupportTicket ? (
                          <Heart className="w-4 h-4 text-slate-900" />
                        ) : (
                          <Crown className="w-4 h-4 text-slate-900" />
                        )}
                      </div>

                      <div className="p-4 bg-slate-900 flex flex-col items-center border-b-2 border-dashed border-slate-700">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${
                            isOmniTicket
                              ? "text-emerald-400"
                              : isSupportTicket
                                ? "text-rose-400"
                                : "text-amber-400"
                          }`}
                        >
                          {isOmniTicket
                            ? "Complimentary Partner Pass"
                            : isSupportTicket
                              ? "Official Supporter Pass"
                              : "Official Entry Pass"}
                        </span>
                        <h2 className="text-xl font-serif font-black text-white mb-2">
                          {selectedTicket.name}
                        </h2>

                        {/* Recipient Nameplate on Ticket */}
                        {isOmniTicket && recipientName.trim() && (
                          <div className="w-full bg-slate-950/90 border border-emerald-500/40 rounded-xl px-3 py-1.5 mb-2.5">
                            <span className="block text-[8px] font-bold uppercase tracking-widest text-emerald-400">
                              Issued To
                            </span>
                            <span className="block text-sm font-serif font-bold text-white tracking-wide">
                              {recipientName.trim()}
                            </span>
                          </div>
                        )}

                        <div className="bg-white p-2 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentTicketCode}`}
                            alt="Ticket QR"
                            crossOrigin="anonymous"
                            className="w-24 h-24"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-950 py-2.5 px-4 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest mb-0.5">
                          Ticket ID
                        </span>
                        <span className="font-mono text-base font-black tracking-widest text-slate-200">
                          {currentTicketCode}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={downloadTicket}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4" /> Save Ticket
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handlePurchaseSubmit}
                    className="w-full text-left space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        {isOmniTicket
                          ? "Generate Omni Ticket"
                          : `Buy ${selectedTicket.name}`}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isOmniTicket
                          ? "Complimentary Partner & VIP Pass Generator."
                          : "Secure M-Pesa Transaction."}
                      </p>
                    </div>

                    {/* OMNI COMPLIMENTARY FIELDS */}
                    {isOmniTicket && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                            Recipient's Full Name:
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="Enter full name for the ticket"
                              className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:border-emerald-400 focus:ring-emerald-100"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                            Invite / Admin Passcode:
                          </label>
                          <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="password"
                              value={inviteCode}
                              onChange={(e) => setInviteCode(e.target.value)}
                              placeholder="Enter invite code"
                              className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:border-emerald-400 focus:ring-emerald-100"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* CUSTOM AMOUNT SELECTOR (Only shows for Support Fund) */}
                    {isSupportTicket && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-2">
                          Select Contribution (KES):
                        </label>
                        <div className="grid grid-cols-4 gap-2 mb-2.5">
                          {[100, 500, 1000, 5000].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => setCustomAmount(amt)}
                              className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                                customAmount === amt
                                  ? "bg-rose-500 text-white border-rose-500 shadow-md"
                                  : "bg-white text-slate-600 border-slate-200"
                              }`}
                            >
                              {amt}
                            </button>
                          ))}
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                            KES
                          </span>
                          <input
                            type="number"
                            min="1"
                            value={customAmount}
                            onChange={(e) =>
                              setCustomAmount(Number(e.target.value))
                            }
                            className="w-full bg-white border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 rounded-xl py-2.5 pl-12 pr-4 text-lg font-black text-slate-900 shadow-sm"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                        {isOmniTicket
                          ? "Recipient Phone Number:"
                          : "M-Pesa Number:"}
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="0712345678"
                          className={`w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 ${
                            isOmniTicket
                              ? "focus:border-emerald-400 focus:ring-emerald-100"
                              : isSupportTicket
                                ? "focus:border-rose-400 focus:ring-rose-100"
                                : "focus:border-amber-400 focus:ring-amber-100"
                          }`}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold uppercase flex justify-center items-center gap-2 shadow-[0_5px_15px_rgba(16,185,129,0.3)] transition-colors"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Processing...
                        </>
                      ) : isOmniTicket ? (
                        "Generate Complimentary Pass"
                      ) : (
                        `Pay KES ${
                          isSupportTicket ? customAmount : selectedTicket.price
                        }`
                      )}
                    </button>
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

export default function EventTickets() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      }
    >
      <EventTicketsContent />
    </Suspense>
  );
}
"use client";
import React, { useState } from "react";
import { Crown, Camera, Globe, Ticket, Users, Star, X, Smartphone, Loader2, CheckCircle2 } from "lucide-react";

export default function EventTickets() {
  // --- M-PESA TICKETING STATE ---
  const [selectedTicket, setSelectedTicket] = useState<{ id: string, name: string, price: number } | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const openTicketModal = (id: string, name: string, price: number) => {
    setSelectedTicket({ id, name, price });
    setTicketCount(1);
    setPhoneNumber("");
    setPaymentSuccess(false);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setPaymentSuccess(false);
  };

  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number");
    if (!selectedTicket) return;
    
    setIsProcessing(true);

    try {
      // Re-using your exact Voting STK Push route!
      const response = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: selectedTicket.price * ticketCount,
          nomineeId: selectedTicket.id, // e.g., TKT-CROWN
          nomineeName: selectedTicket.name,
          votes: ticketCount // The webhook will tally ticket quantities as "votes" in the DB!
        })
      });

      const resData = await response.json();

      if (resData.success) {
        setPaymentSuccess(true);
        setTimeout(() => {
          closeModal();
        }, 6000); 
      } else {
        alert("Payment initialization failed: " + (resData.error || "Please verify your credentials and try again."));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong connecting to M-Pesa. Please check your internet connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="events" className="pt-24 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
      
      {/* CLEAR HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-white/30" /> 
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header */}
        <div className="flex justify-center mb-10">
          <div className="max-w-xl w-full text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-200 shadow-sm">
              <Ticket className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">
              Event <span className="text-amber-600">Tickets</span>
            </h2>
            <p className="text-slate-700 text-[13px] leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
              Secure your pass to East Africa's premier modeling and leadership showcase. Join us in celebrating outstanding young talent.
            </p>
          </div>
        </div>

        {/* --- NEW TICKET SECTION --- */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Crown Ticket (Students) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">Crown Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">For Students</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900">500</span>
                <span className="text-sm font-bold text-slate-500 ml-1">KES</span>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Crown className="w-4 h-4 text-amber-500" /> General Admission
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Crown className="w-4 h-4 text-amber-500" /> Student ID Required
                </div>
                <div className="inline-block px-2.5 py-1 bg-amber-50 text-amber-700 rounded text-[10px] font-bold uppercase tracking-widest mt-2 border border-amber-100">
                  150 Tickets Available
                </div>
              </div>
              <button 
                onClick={() => openTicketModal("TKT-CROWN", "Crown Ticket", 500)}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors mt-auto"
              >
                Buy Ticket
              </button>
            </div>

            {/* Royal Ticket (Guests) */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 transform md:scale-105 z-10 flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="w-24 h-24 text-white" />
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              
              <div className="inline-block px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-[9px] font-black uppercase tracking-widest absolute top-4 right-4 shadow-sm">
                Most Popular
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white leading-none">Royal Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">For Guests</span>
                </div>
              </div>
              <div className="mb-6 relative z-10">
                <span className="text-4xl font-black text-white">1,000</span>
                <span className="text-sm font-bold text-slate-400 ml-1">KES</span>
              </div>
              <div className="space-y-3 mb-8 relative z-10 flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Star className="w-4 h-4 text-amber-400" /> Premium Seating Area
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Star className="w-4 h-4 text-amber-400" /> Red Carpet Access
                </div>
                <div className="inline-block px-2.5 py-1 bg-slate-800 text-amber-400 rounded text-[10px] font-bold uppercase tracking-widest mt-2 border border-slate-700">
                  100 Tickets Available
                </div>
              </div>
              <button 
                onClick={() => openTicketModal("TKT-ROYAL", "Royal Ticket", 1000)}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_20px_rgba(245,158,11,0.4)] relative z-10 mt-auto"
              >
                Buy Ticket
              </button>
            </div>

            {/* Omni Ticket (Partners) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden opacity-90 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-300" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">Omni Ticket</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Partners & Services</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-black text-slate-400 uppercase tracking-widest">Invite Only</span>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Star className="w-4 h-4 text-slate-400" /> VIP Backstage Access
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Star className="w-4 h-4 text-slate-400" /> Service Provider Clearance
                </div>
                <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-widest mt-2">
                  Not For Sale
                </div>
              </div>
              <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed mt-auto">
                Closed
              </button>
            </div>

          </div>
        </div>

        {/* --- CATEGORIES SECTION --- */}
        <div className="flex justify-center mb-10 border-t border-slate-200 pt-16">
          <div className="max-w-xl w-full text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3 tracking-tight drop-shadow-sm">Upcoming Categories</h2>
            <p className="text-slate-700 text-[13px] leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
              Platforms dedicated to identifying, mentoring, and celebrating outstanding young leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Mr & Miss Machakos - Mavoko */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Mavoko Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-mavoko'); if (fallback) fallback.style.display = 'block'; }} />
                <Crown id="icon-fallback-mavoko" className="w-5 h-5 text-rose-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Mavoko</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                One of our flagship annual events, this is a premier beauty pageant and leadership platform. Winners become ambassadors who champion positive social change while representing the region at various public engagements.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Event Emphasis:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {["Leadership", "Community Service", "Tourism Promotion", "Youth Empowerment", "Cultural Heritage", "Fashion & Creativity"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos - Township */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Township Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-machakos'); if (fallback) fallback.style.display = 'block'; }} />
                <Camera id="icon-fallback-machakos" className="w-5 h-5 text-amber-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Township</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                Our county flagship pageant that showcases the beauty, culture, diversity, tourism potential, and talent within Machakos County. A respected platform for nurturing future leaders and brand ambassadors.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Platform Opportunities:</h4>
                <ul className="space-y-2.5">
                  {["Develop leadership skills", "Promote local tourism", "Advocate for communities", "Fashion industry exposure"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mr & Miss Machakos - Diaspora */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col shadow-xl">
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-105 transition-transform shadow-sm p-1.5 overflow-hidden">
                <img src="/machakos-logo.png" alt="Mr & Miss Machakos - Diaspora Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('icon-fallback-diaspora'); if (fallback) fallback.style.display = 'block'; }} />
                <Globe id="icon-fallback-diaspora" className="w-5 h-5 text-sky-500 hidden" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Mr. & Miss Machakos - Diaspora</h3>
              <p className="text-slate-600 mb-5 leading-relaxed text-[12px] flex-grow">
                A unique global platform celebrating beauty, brains, and culture while connecting the Kenyan diaspora back to Machakos County. Honoring young leaders who bridge the gap and champion development from abroad.
              </p>
              <div className="mt-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-widest text-[9px]">Diaspora Focus Areas:</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {["Global Advocacy", "Cultural Exchange", "Investment Promotion", "Networking Opportunities"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- M-PESA TICKETING MODAL --- */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-slate-50 p-6 md:p-8 flex flex-col justify-center relative">
              {paymentSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Check Your Phone!</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    An M-Pesa prompt has been sent to your phone. Enter your PIN to purchase {ticketCount}x <span className="text-amber-600 font-bold">{selectedTicket.name}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePurchaseSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Buy {selectedTicket.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">Pay securely via M-Pesa.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Number of Tickets:
                    </label>
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                      <span className="text-xs text-slate-600 font-bold ml-2">Quantity:</span>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button" 
                          onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-lg text-amber-600 min-w-[32px] text-center">{ticketCount}</span>
                        <button 
                          type="button" 
                          onClick={() => setTicketCount(prev => Math.min(5, prev + 1))} // Max 5 per transaction to avoid high M-Pesa limits
                          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
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

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <span className="text-sm text-slate-600 font-bold">Total Cost:</span>
                      <span className="text-xl font-serif font-black text-amber-500 drop-shadow-sm">
                        KES {(selectedTicket.price * ticketCount).toLocaleString()}
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
                        `Pay KES ${selectedTicket.price * ticketCount}`
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
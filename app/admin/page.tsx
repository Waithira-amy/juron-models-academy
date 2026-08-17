"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Lock, Users, Phone, MapPin, Calendar, Loader2, ArrowLeft, Download, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applicants, setApplicants] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
      });

      const data = await res.json();

      if (data.success) {
        setApplicants(data.applicants);
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Access denied.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-md w-full bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-xl relative z-10 text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-100">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          
          <h1 className="font-serif text-3xl font-semibold text-slate-900 mb-2 tracking-tight">Admin Access</h1>
          <p className="text-slate-500 text-sm mb-8">Enter the secret organizer PIN to view registered applicants.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter PIN (e.g., JMA2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 text-center text-lg tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-colors shadow-inner"
              />
            </div>
            
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-wider">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold tracking-widest uppercase text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock Dashboard"}
            </button>
          </form>

          <Link href="/" className="inline-block mt-8 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 relative font-sans">
      <div className="max-w-6xl mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-emerald-50 text-[10px] uppercase font-bold tracking-widest text-emerald-600 border border-emerald-100 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Connection
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Registered Applicants
            </h1>
            <p className="text-slate-500 text-sm mt-2">Total Registrations: <span className="font-bold text-slate-900">{applicants.length}</span></p>
          </div>

          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-rose-600 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Exit Dashboard
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Applicant Name</th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Age</th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Location</th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Date Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                      No applications have been submitted yet.
                    </td>
                  </tr>
                ) : (
                  applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100">
                            <Users className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-900 text-sm">{applicant.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {applicant.phone}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                        {applicant.age} yrs
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {applicant.location}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 text-right">
                        {new Date(applicant.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
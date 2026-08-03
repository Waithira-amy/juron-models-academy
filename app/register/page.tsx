"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Calendar, MapPin, Phone, UploadCloud, ArrowLeft, CheckCircle2, Crown, Loader2, AlertTriangle } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    contact: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file) {
      setError("Please upload a photo.");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("age", formData.age);
      submitData.append("location", formData.location);
      submitData.append("contact", formData.contact);
      submitData.append("photo", file);

      // Assuming you have the API route set up from the previous steps
      const response = await fetch("/api/register", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to submit application.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden font-sans text-slate-900">
      {/* Light Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* SHRUNK MAX-WIDTH to max-w-lg for a much sleeker box */}
      <div className="max-w-lg mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 text-xs font-bold uppercase tracking-wider mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white border border-slate-200 text-rose-500 mb-6 shadow-sm overflow-hidden p-2">
             {/* Using the logo if available, falling back to Crown icon if not */}
             <img src="/mavoko-logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; const fallback = document.getElementById('mavoko-fallback'); if (fallback) fallback.style.display = 'block'; }} />
             <Crown id="mavoko-fallback" className="w-8 h-8 hidden" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Mr & Miss Mavoko</h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Register below to secure your audition spot for the most prestigious pageant and leadership platform in the region.
          </p>
        </div>

        {/* REDUCED PADDING inside the form container to make it tighter */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
              <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">Application Received!</h2>
              <p className="text-slate-600 mb-8 text-sm">
                Thank you for applying. Our team will review your application and contact you with audition details.
              </p>
              <Link href="/" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-md">
                Return Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Age & Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Age</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      name="age"
                      min="16"
                      max="35"
                      required
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Your age"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="e.g., 0712 345 678"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-colors shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City / Area"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Upload Photo</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${file ? 'border-amber-400 bg-amber-50' : 'border-slate-300 bg-slate-50 group-hover:border-rose-400 group-hover:bg-rose-50'}`}>
                    <UploadCloud className={`w-8 h-8 mb-2 ${file ? 'text-amber-500' : 'text-slate-400 group-hover:text-rose-500'} transition-colors`} />
                    <span className="text-sm font-bold text-slate-700 mb-1 truncate w-full px-4">
                      {file ? file.name : "Click to upload image"}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Max 5MB</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-widest uppercase text-xs shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
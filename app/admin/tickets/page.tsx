"use client";

import { useState } from "react";

// --- PIN DIRECTORY ---
// Change these PINs to whatever you want to give your promoters!
const PIN_DIRECTORY: Record<string, { role: "ADMIN" | "AFFILIATE"; code?: string; name?: string }> = {
  "9999": { role: "ADMIN", name: "Master Admin" },
  "1111": { role: "AFFILIATE", code: "TRAVIS", name: "Travis Kilatya" },
  "2222": { role: "AFFILIATE", code: "JANE", name: "Jane Njeri" },
  "3333": { role: "AFFILIATE", code: "COLLINS", name: "Collins" },
  "4444": { role: "AFFILIATE", code: "MASCO", name: "Masco" },
  "5555": { role: "AFFILIATE", code: "SIR_DENNIS", name: "Sir Dennis" },
};

export default function TicketingDashboard() {
  const [pin, setPin] = useState("");
  const [user, setUser] = useState<{ role: "ADMIN" | "AFFILIATE"; code?: string; name?: string } | null>(null);
  const [error, setError] = useState("");
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = PIN_DIRECTORY[pin];
    
    if (foundUser) {
      setUser(foundUser);
      setError("");
      fetchData();
    } else {
      setError("Invalid PIN. Please try again.");
      setPin("");
    }
  };

  const fetchData = () => {
    setLoading(true);
    fetch("/api/dashboard/tickets")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data", err);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setPin("");
    setData(null);
  };

  // 1. PIN LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">?</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Access</h1>
          <p className="text-sm text-gray-500 mb-8">Enter your secure PIN to view your ticketing dashboard.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full text-center tracking-[1em] text-2xl font-bold border border-gray-300 rounded-xl py-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center text-red-500">Failed to load data.</div>;

  // 2. MASTER ADMIN DASHBOARD (Sees Everything)
  if (user.role === "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Master Admin Dashboard</h1>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100">
              Lock Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Total Tickets Sold</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data.stats.totalTicketsSold}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Gross Revenue (KES)</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{data.stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Commissions Owed (20%)</p>
              <p className="text-3xl font-bold text-orange-500 mt-2">{data.stats.totalCommissionsOwed.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Net Revenue (KES)</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{data.stats.netRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-1">
              <div className="bg-gray-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Affiliate Earnings</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {data.affiliates
                  .sort((a: any, b: any) => b.commissionKES - a.commissionKES)
                  .map((affiliate: any) => (
                  <div key={affiliate.code} className="flex justify-between items-center p-6 hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold text-gray-900">{affiliate.name}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">Code: {affiliate.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">KES {affiliate.commissionKES.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-2">
              <div className="bg-gray-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Recent Ticket Sales</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Phone</th>
                      <th className="px-6 py-4 font-medium">Ticket Type</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.orders.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No successful ticket sales yet.</td></tr>
                    ) : (
                      data.orders.map((order: any) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{order.phoneNumber}</td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-900">{order.ticketType}</span>
                            <span className="text-xs text-gray-500 ml-2">(x{order.quantity})</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">KES {order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            {order.source === "REFERRAL" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Ref: {order.affiliate?.name || order.affiliateCode}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Website</span>
                            )}
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
      </div>
    );
  }

  // 3. AFFILIATE DASHBOARD (Only sees their own data)
  const myAffiliateData = data.affiliates.find((a: any) => a.code === user.code) || { commissionKES: 0 };
  const myOrders = data.orders.filter((o: any) => o.affiliateCode === user.code);
  const myTicketsSold = myOrders.reduce((sum: number, o: any) => sum + o.quantity, 0);
  const myTotalRevenue = myOrders.reduce((sum: number, o: any) => sum + o.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-sm font-medium text-amber-600 mt-1">Affiliate Portal</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100">
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Your Tickets Sold</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{myTicketsSold}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Generated (KES)</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{myTotalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-200">
            <p className="text-sm text-amber-700 font-medium">Your Earnings (20%)</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">KES {myAffiliateData.commissionKES.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 px-6 py-4">
            <h2 className="text-lg font-bold text-white">Your Ticket Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Phone Number</th>
                  <th className="px-6 py-4 font-medium">Ticket Type</th>
                  <th className="px-6 py-4 font-medium">Amount (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myOrders.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      You haven't sold any tickets yet. Keep sharing your link!
                    </td>
                  </tr>
                ) : (
                  myOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{order.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.ticketType} <span className="text-xs text-gray-500">(x{order.quantity})</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {order.amount.toLocaleString()}
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
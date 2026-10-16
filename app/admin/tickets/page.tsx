"use client";

import { useEffect, useState } from "react";

export default function TicketingDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/tickets")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">Loading Ticketing Data...</p>
      </div>
    );
  }

  if (!data) return <div>Failed to load data.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ticketing & Commissions Dashboard</h1>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Tickets Sold</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.stats.totalTicketsSold}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Gross Revenue (KES)</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {data.stats.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Commissions Owed (20%)</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {data.stats.totalCommissionsOwed.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Net Revenue (KES)</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {data.stats.netRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- AFFILIATE LEADERBOARD --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-1">
            <div className="bg-gray-900 px-6 py-4">
              <h2 className="text-lg font-bold text-white">Affiliate Earnings</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {data.affiliates.map((affiliate: any) => (
                <div key={affiliate.code} className="flex justify-between items-center p-6 hover:bg-gray-50 transition">
                  <div>
                    <p className="font-semibold text-gray-900">{affiliate.name}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">Code: {affiliate.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">
                      KES {affiliate.commissionKES.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RECENT TICKET ORDERS --- */}
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
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No successful ticket sales yet.
                      </td>
                    </tr>
                  ) : (
                    data.orders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{order.phoneNumber}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{order.ticketType}</span>
                          <span className="text-xs text-gray-500 ml-2">(x{order.quantity})</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          KES {order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {order.source === "REFERRAL" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Ref: {order.affiliate?.name || order.affiliateCode}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Website
                            </span>
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
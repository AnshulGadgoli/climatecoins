import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { year: '2022', price: 1100 },
  { year: '2023', price: 1250 },
  { year: '2024', price: 1400 },
  { year: '2025', price: 1550 },
  { year: '2026', price: 1800, forecastMin: 1700, forecastMax: 2000 },
  { year: '2027', price: 2100, forecastMin: 1850, forecastMax: 2400 },
  { year: '2028', price: 2450, forecastMin: 2050, forecastMax: 2900 },
];

export function Forecast() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading text-primary">Price Forecast & Intelligence</h2>
      <p className="text-text/70 max-w-3xl text-sm">
        Our mock ML model projects future carbon credit prices based on Indian regulatory trends, corporate net-zero commitments, and data-center energy demand. Lock in prices now with forward contracts to hedge against volatility.
      </p>

      <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val}`} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            
            {/* Confidence Band (Forecast) */}
            <Area type="monotone" dataKey="forecastMax" stroke="none" fill="#C98B2B" fillOpacity={0.1} />
            <Area type="monotone" dataKey="forecastMin" stroke="none" fill="#ffffff" fillOpacity={1} />
            
            {/* Primary Price Line */}
            <Area type="monotone" dataKey="price" stroke="#1F4D3A" strokeWidth={3} fill="#1F4D3A" fillOpacity={0.05} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
            <h3 className="font-medium mb-2">Demand Drivers</h3>
            <ul className="text-sm text-text/70 space-y-2 list-disc pl-5">
              <li>Data center capacity in India expected to triple by 2028.</li>
              <li>New sustainability compliance mandates for top 1000 listed companies (BRSR).</li>
              <li>Limited supply of verified, high-quality nature-based projects.</li>
            </ul>
         </div>
         <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
            <h3 className="font-medium mb-2">Recommendation</h3>
            <p className="text-sm text-text/70">
              Procuring forwards at ₹1,600 - ₹1,800 today provides a <strong>20-30% hedge</strong> against projected 2028 spot prices. Focus on Agroforestry and Biochar projects for highest durability.
            </p>
         </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useStore } from '../../store/useStore';
import { Download } from 'lucide-react';

export function Payouts() {
  const { language, farmers } = useStore();
  const fpoFarmers = farmers.filter(f => f.fpoId === 'fpo-1' && f.status === 'POOLED');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading text-primary">
          {language === 'en' ? 'Farmer Payouts' : 'किसान भुगतान'}
        </h2>
        <button className="px-4 py-2 bg-white border border-text/20 text-text rounded-md text-sm font-medium flex items-center gap-2 hover:bg-black/5">
          <Download className="w-4 h-4" />
          {language === 'en' ? 'Export CSV' : 'CSV डाउनलोड करें'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-text/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-text/5 border-b border-text/10">
            <tr>
              <th className="p-4 font-medium text-text/70">Farmer Name</th>
              <th className="p-4 font-medium text-text/70">Village</th>
              <th className="p-4 font-medium text-text/70">Enrolled Area</th>
              <th className="p-4 font-medium text-text/70">Q3 Payout</th>
              <th className="p-4 font-medium text-text/70">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text/5">
            {fpoFarmers.map((f) => (
              <tr key={f.id} className="hover:bg-text/5 transition-colors">
                <td className="p-4 font-medium">{f.name}</td>
                <td className="p-4 text-text/70">{f.village}</td>
                <td className="p-4 tabular-nums">{f.landAreaHa} ha</td>
                <td className="p-4 tabular-nums font-medium">
                  ₹{((f.estimatedTco2e || 0) * 1500 * 0.25).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                    Pending
                  </span>
                </td>
              </tr>
            ))}
            {fpoFarmers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text/50">
                  No payouts generated yet. Pool and verify farmers first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

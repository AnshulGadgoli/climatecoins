import React from 'react';
import { useStore } from '../../store/useStore';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Hash } from 'lucide-react';

export function Wallet() {
  const { transactions } = useStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-heading text-primary">Carbon Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary text-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <WalletIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Credits Held</span>
          </div>
          <div className="text-4xl font-heading tabular-nums">4,250</div>
          <div className="text-sm text-white/60 mt-1">tCO2e Verified</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="text-text/70 mb-2 text-sm font-medium">Pending Delivery</div>
          <div className="text-4xl font-heading tabular-nums">1,200</div>
          <div className="text-sm text-text/50 mt-1">From Forward Contracts</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="text-text/70 mb-2 text-sm font-medium">Retired Credits</div>
          <div className="text-4xl font-heading tabular-nums text-text/40">850</div>
          <div className="text-sm text-text/50 mt-1">Offset Claimed</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-text/10 shadow-sm overflow-x-auto">
        <div className="p-4 border-b border-text/10 bg-text/5 font-medium">Transaction Ledger</div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-text/10">
            <tr>
              <th className="p-4 font-medium text-text/70">Tx Hash / ID</th>
              <th className="p-4 font-medium text-text/70">Date</th>
              <th className="p-4 font-medium text-text/70">Type</th>
              <th className="p-4 font-medium text-text/70">Volume</th>
              <th className="p-4 font-medium text-text/70">Value</th>
              <th className="p-4 font-medium text-text/70">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text/5">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-text/5 transition-colors">
                <td className="p-4 text-xs font-mono text-text/60 flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {tx.id.replace('tx-', '0x')}a9f...
                </td>
                <td className="p-4 text-text/80">{tx.date}</td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-primary">
                    <ArrowDownRight className="w-4 h-4" /> Receive (Purchase)
                  </span>
                </td>
                <td className="p-4 tabular-nums font-medium">+{tx.volume} tCO2e</td>
                <td className="p-4 tabular-nums">₹{tx.price.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded font-medium ${
                    tx.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

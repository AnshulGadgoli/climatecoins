import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Calculator, ShieldCheck } from 'lucide-react';

export function ContractBuilder() {
  const { addTransaction } = useStore();
  const navigate = useNavigate();
  const [volume, setVolume] = useState(500);
  const [vintage, setVintage] = useState('2026-2027');

  const estimatedPrice = 1600;
  const totalCost = volume * estimatedPrice;

  const handlePurchase = () => {
    addTransaction({
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      projectId: 'proj-forward',
      buyerName: 'TechCorp Data Center',
      volume,
      price: totalCost,
      status: 'PENDING'
    });
    alert('Forward contract executed! Funds are held in escrow for FPOs.');
    navigate('/buyer/wallet');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-heading text-primary">Build Forward Contract</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-4">
            <h3 className="font-medium text-lg">Requirements</h3>
            
            <div>
              <label className="block text-sm text-text/70 mb-1">Volume (tCO2e)</label>
              <input type="range" min="100" max="5000" step="100" value={volume} 
                onChange={e => setVolume(parseInt(e.target.value))} className="w-full accent-primary" />
              <div className="text-right text-sm font-medium mt-1">{volume} tCO2e</div>
            </div>

            <div>
              <label className="block text-sm text-text/70 mb-1">Delivery Years</label>
              <select className="w-full p-2 border border-text/20 rounded-md" value={vintage} onChange={e => setVintage(e.target.value)}>
                <option value="2025-2026">2025 - 2026</option>
                <option value="2026-2027">2026 - 2027</option>
                <option value="2027-2030">2027 - 2030</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-text/70 mb-1">Preferred Practice</label>
              <select className="w-full p-2 border border-text/20 rounded-md">
                <option>Any Nature-Based</option>
                <option>Agroforestry</option>
                <option>Soil Carbon (No-Till)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-primary text-white p-6 rounded-xl shadow-md sticky top-6">
            <div className="flex items-center gap-2 mb-6 text-white/80">
              <Calculator className="w-5 h-5" />
              <h3 className="font-medium">Contract Estimate</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-sm">Volume</span>
                <span className="font-medium tabular-nums">{volume} tCO2e</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-sm">Locked Price</span>
                <span className="font-medium tabular-nums">₹{estimatedPrice} / tCO2e</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg">Total Cost</span>
                <span className="text-2xl font-heading tabular-nums">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg mb-6 flex gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p>Price protected against market fluctuations. Capital enables farmer onboarding.</p>
            </div>

            <button onClick={handlePurchase} className="w-full py-3 bg-white text-primary rounded-md font-bold hover:bg-white/90 transition-colors">
              Execute Contract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

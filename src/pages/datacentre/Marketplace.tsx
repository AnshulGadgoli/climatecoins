import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Leaf, Filter } from 'lucide-react';

export function Marketplace() {
  const { projects } = useStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = projects.filter(p => filter === 'ALL' || p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading text-primary">Carbon Marketplace</h2>
        <div className="flex gap-2">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-text/20 rounded-md text-sm bg-white focus:outline-none"
          >
            <option value="ALL">All Projects</option>
            <option value="APPROVED">Verified Available</option>
            <option value="UNDER_REVIEW">Pipeline (Forward)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="h-32 bg-text/5 flex items-center justify-center border-b border-text/5 relative">
              <Leaf className="w-12 h-12 text-primary/20" />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded shadow-sm ${
                  p.status === 'APPROVED' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-900'
                }`}>
                  {p.status === 'APPROVED' ? 'Verified' : 'Pipeline'}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-heading font-medium text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-text/60 mb-4">{p.state} • {p.practice}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs text-text/50 uppercase">Vintage</div>
                  <div className="font-medium text-sm">{p.vintage}</div>
                </div>
                <div>
                  <div className="text-xs text-text/50 uppercase">Volume</div>
                  <div className="font-medium text-sm tabular-nums">{p.estimatedVolume} tCO2e</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-text/50 uppercase">Price</div>
                  <div className="font-medium text-lg text-primary tabular-nums">₹{p.pricePerTco2e}/tCO2e</div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/buyer/contract')}
                className="w-full mt-auto py-2 bg-text/5 text-text hover:bg-primary hover:text-white rounded-md font-medium text-sm transition-colors"
              >
                Buy Forward Contract
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

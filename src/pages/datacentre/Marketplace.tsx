import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Leaf, Filter } from 'lucide-react';

export function Marketplace() {
  const { projects } = useStore();
  const navigate = useNavigate();
  const verifiedProjects = projects.filter(p => p.status === 'APPROVED');
  const pipelineProjects = projects.filter(p => p.status === 'UNDER_REVIEW');

  return (
    <div className="space-y-12">
      
      {/* Section 1: Verified Carbon Credits */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-heading text-primary">Instant Verified Credits</h2>
            <p className="text-sm text-text/70 mt-1">Purchase instantly retired credits from verified Indian FPO projects.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedProjects.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-green-500/30 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 uppercase tracking-wide">
                Verified Available
              </div>
              <div className="h-28 bg-green-50 flex items-center justify-center border-b border-green-100">
                <Leaf className="w-10 h-10 text-green-600/40" />
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
                    <div className="text-xs text-text/50 uppercase">Available</div>
                    <div className="font-medium text-sm tabular-nums text-green-700">{p.estimatedVolume} tCO2e</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-text/50 uppercase">Spot Price</div>
                    <div className="font-medium text-lg text-primary tabular-nums">₹{p.pricePerTco2e}/tCO2e</div>
                  </div>
                </div>
                
                <button onClick={() => alert('Purchase flow initiated for verified credits.')} className="w-full mt-auto py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition-colors">
                  Buy & Retire Instantly
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Forward Contracts */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-heading text-primary">Pipeline & Forward Contracts</h2>
            <p className="text-sm text-text/70 mt-1">Pre-purchase credits from projects currently onboarding or undergoing verification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineProjects.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 uppercase tracking-wide">
                Under Verification
              </div>
              <div className="h-28 bg-text/5 flex items-center justify-center border-b border-text/5">
                <Filter className="w-10 h-10 text-primary/20" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-heading font-medium text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-text/60 mb-4">{p.state} • {p.practice}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-text/50 uppercase">Est. Vintage</div>
                    <div className="font-medium text-sm">{p.vintage}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text/50 uppercase">Est. Volume</div>
                    <div className="font-medium text-sm tabular-nums">{p.estimatedVolume} tCO2e</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-text/50 uppercase">Floor Price</div>
                    <div className="font-medium text-lg text-primary tabular-nums">₹{p.pricePerTco2e}/tCO2e</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/datacentre/contract')}
                  className="w-full mt-auto py-2 bg-text/5 text-text hover:bg-primary hover:text-white rounded-md font-medium text-sm transition-colors"
                >
                  Build Forward Contract
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

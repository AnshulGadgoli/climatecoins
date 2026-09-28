import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Leaf, Users, Factory, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Home() {
  const { setRole } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'FPO' | 'DATACENTRE' | 'ADMIN'>('FPO');
  const [loginId, setLoginId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) return;
    
    setRole(activeTab, loginId);
    if (activeTab === 'FPO') navigate('/fpo/dashboard');
    else if (activeTab === 'DATACENTRE') navigate('/datacentre/marketplace');
    else if (activeTab === 'ADMIN') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b border-text/10 bg-white shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-primary w-6 h-6" />
            <h1 className="font-heading font-bold text-xl text-primary">ClimateCoins</h1>
          </div>
          <div className="text-sm text-text/60 font-medium">
            Verified Carbon Platform
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center max-w-6xl mx-auto w-full px-6 py-12 gap-12">
        
        {/* Hero Section */}
        <div className="flex-1 space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Connecting Indian farmers to global datacentres.
          </h2>
          <p className="text-lg text-text/80 max-w-xl leading-relaxed">
            ClimateCoins helps Farmer Producer Organisations (FPOs) aggregate sustainable practices, verify carbon credits digitally, and sell forward contracts directly to datacentres to offset energy demand.
          </p>
          
          <div className="space-y-4 pt-4 border-t border-text/10">
            <div className="flex items-start gap-4">
              <div className="mt-1"><Users className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold mb-1">Farmer Onboarding</h4>
                <p className="text-sm text-text/70">FPOs aggregate practices like agroforestry via digital MRV.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1"><ShieldCheck className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold mb-1">Verification</h4>
                <p className="text-sm text-text/70">Satellite data and ML automatically evaluate eligibility and verify impact.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1"><Factory className="w-5 h-5 text-primary" /></div>
              <div>
                <h4 className="font-semibold mb-1">Datacentre Offtake</h4>
                <p className="text-sm text-text/70">Datacentres purchase forward contracts, funding sustainable agriculture.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Box */}
        <div className="w-full lg:w-[420px] bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden shrink-0">
          <div className="flex border-b border-text/10">
            <button 
              className={cn("flex-1 py-4 text-sm font-medium transition-colors text-center border-b-2", activeTab === 'FPO' ? "border-primary text-primary bg-primary/5" : "border-transparent text-text/60 hover:bg-black/5")}
              onClick={() => setActiveTab('FPO')}
            >
              FPO
            </button>
            <button 
              className={cn("flex-1 py-4 text-sm font-medium transition-colors text-center border-b-2", activeTab === 'DATACENTRE' ? "border-primary text-primary bg-primary/5" : "border-transparent text-text/60 hover:bg-black/5")}
              onClick={() => setActiveTab('DATACENTRE')}
            >
              Datacentre
            </button>
            <button 
              className={cn("flex-1 py-4 text-sm font-medium transition-colors text-center border-b-2", activeTab === 'ADMIN' ? "border-primary text-primary bg-primary/5" : "border-transparent text-text/60 hover:bg-black/5")}
              onClick={() => setActiveTab('ADMIN')}
            >
              Admin
            </button>
          </div>
          
          <div className="p-8">
            <h3 className="font-heading text-2xl mb-2">
              {activeTab === 'FPO' && "FPO Login"}
              {activeTab === 'DATACENTRE' && "Datacentre Login"}
              {activeTab === 'ADMIN' && "Admin Portal"}
            </h3>
            <p className="text-sm text-text/60 mb-6">
              {activeTab === 'FPO' && "Enter your registered FPO ID to manage farmers and pools."}
              {activeTab === 'DATACENTRE' && "Access carbon marketplaces and price forecasting."}
              {activeTab === 'ADMIN' && "Review platform stats and verification queues."}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text/80 mb-1">
                  {activeTab === 'FPO' ? "FPO ID (e.g., fpo-1)" : 
                   activeTab === 'DATACENTRE' ? "Corporate ID or Email" : "Admin Username"}
                </label>
                <input 
                  type="text" 
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={activeTab === 'FPO' ? "fpo-1" : "Enter ID"}
                  className="w-full p-2.5 border border-text/20 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <button type="submit" className="w-full py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
                Sign In
              </button>
              <div className="text-xs text-text/50 text-center mt-4">
                *This is a hackathon prototype. Enter any string to log in.
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

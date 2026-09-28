import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Leaf, Users, ShieldCheck, Factory, ArrowRight } from 'lucide-react';

export function Home() {
  const { setRole } = useStore();
  const navigate = useNavigate();

  const handleLogin = (role: 'FPO' | 'BUYER' | 'VERIFIER' | 'ADMIN') => {
    setRole(role);
    if (role === 'FPO') navigate('/fpo/dashboard');
    else if (role === 'BUYER') navigate('/buyer/marketplace');
    else if (role === 'VERIFIER') navigate('/verifier/queue');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-text/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="text-primary w-6 h-6" />
            <h1 className="font-heading font-bold text-xl text-primary">ClimateCoins</h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleLogin('FPO')} className="text-sm font-medium hover:text-primary transition-colors">FPO Login</button>
            <button onClick={() => handleLogin('BUYER')} className="text-sm font-medium hover:text-primary transition-colors">Corporate Login</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="py-12 md:py-20 max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
            Connecting Indian farmers to global carbon markets.
          </h2>
          <p className="text-lg text-text/80 mb-8 max-w-2xl leading-relaxed">
            ClimateCoins helps Farmer Producer Organisations (FPOs) aggregate sustainable practices, verify carbon credits digitally, and sell directly to corporate buyers like data centres. Predictable payouts for farmers, verified impact for companies.
          </p>
        </div>

        {/* How it works strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-6 rounded-lg border border-text/10 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 font-bold">1</div>
            <h3 className="font-semibold mb-2">Farmer Onboarding</h3>
            <p className="text-sm text-text/70">FPOs onboard farmers and track sustainable practices like no-till and agroforestry.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-text/10 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 font-bold">2</div>
            <h3 className="font-semibold mb-2">Digital MRV</h3>
            <p className="text-sm text-text/70">Satellite data and ML estimate carbon potential and verify practices continuously.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-text/10 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 font-bold">3</div>
            <h3 className="font-semibold mb-2">Verification</h3>
            <p className="text-sm text-text/70">Independent verifiers review evidence to issue certified carbon credits.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-text/10 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 font-bold">4</div>
            <h3 className="font-semibold mb-2">Corporate Offtake</h3>
            <p className="text-sm text-text/70">Data centres buy forward contracts, ensuring predictable payouts for farmers.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary text-white rounded-xl p-8 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="text-center md:text-left md:px-6">
            <div className="text-3xl font-heading mb-1 tabular-nums">4,250+</div>
            <div className="text-white/80 text-sm">Farmers Enrolled</div>
          </div>
          <div className="text-center md:text-left md:px-6">
            <div className="text-3xl font-heading mb-1 tabular-nums">12,400</div>
            <div className="text-white/80 text-sm">Hectares Under Management</div>
          </div>
          <div className="text-center md:text-left md:px-6">
            <div className="text-3xl font-heading mb-1 tabular-nums">₹1.2 Cr</div>
            <div className="text-white/80 text-sm">Paid to Farmers to Date</div>
          </div>
        </div>

        {/* Role Picker */}
        <div className="bg-white rounded-xl border border-text/10 shadow-sm p-8 max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl mb-8 text-center">Interactive Demo: Choose a Role</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button onClick={() => handleLogin('FPO')} className="flex flex-col items-center p-6 border border-text/10 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center group">
              <Users className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold mb-1">FPO Manager</div>
              <div className="text-xs text-text/60">Onboard & pool farmers</div>
            </button>
            <button onClick={() => handleLogin('VERIFIER')} className="flex flex-col items-center p-6 border border-text/10 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center group">
              <ShieldCheck className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold mb-1">Verifier</div>
              <div className="text-xs text-text/60">Review & approve projects</div>
            </button>
            <button onClick={() => handleLogin('BUYER')} className="flex flex-col items-center p-6 border border-text/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-center group">
              <Factory className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold mb-1">Corporate Buyer</div>
              <div className="text-xs text-text/60">Purchase carbon contracts</div>
            </button>
            <button onClick={() => handleLogin('ADMIN')} className="flex flex-col items-center p-6 border border-text/10 rounded-lg hover:border-text/30 hover:bg-black/5 transition-all text-center group">
              <Leaf className="w-8 h-8 text-text/70 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold mb-1">Admin</div>
              <div className="text-xs text-text/60">Platform overview</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

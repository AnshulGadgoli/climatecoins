import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { FpoDashboard } from './pages/fpo/Dashboard';
import { OnboardFarmer } from './pages/fpo/OnboardFarmer';
import { Pooling } from './pages/fpo/Pooling';
import { Payouts } from './pages/fpo/Payouts';
import { AdminOverview } from './pages/admin/Overview';
import { VerificationQueue } from './pages/admin/VerificationQueue';
import { Marketplace } from './pages/datacentre/Marketplace';
import { ContractBuilder } from './pages/datacentre/ContractBuilder';
import { Forecast } from './pages/datacentre/Forecast';
import { Wallet } from './pages/datacentre/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          
          {/* FPO Routes */}
          <Route path="/fpo/dashboard" element={<FpoDashboard />} />
          <Route path="/fpo/onboard" element={<OnboardFarmer />} />
          <Route path="/fpo/pooling" element={<Pooling />} />
          <Route path="/fpo/payouts" element={<Payouts />} />

          {/* Datacentre Routes */}
          <Route path="/datacentre/marketplace" element={<Marketplace />} />
          <Route path="/datacentre/contract" element={<ContractBuilder />} />
          <Route path="/datacentre/forecast" element={<Forecast />} />
          <Route path="/datacentre/wallet" element={<Wallet />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminOverview />} />
          <Route path="/admin/verify" element={<VerificationQueue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

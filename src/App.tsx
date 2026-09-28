import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { FpoDashboard } from './pages/fpo/Dashboard';
import { OnboardFarmer } from './pages/fpo/OnboardFarmer';
import { Pooling } from './pages/fpo/Pooling';
import { Payouts } from './pages/fpo/Payouts';
import { VerifierQueue } from './pages/verifier/Queue';
import { Marketplace } from './pages/buyer/Marketplace';
import { ContractBuilder } from './pages/buyer/ContractBuilder';
import { Forecast } from './pages/buyer/Forecast';
import { Wallet } from './pages/buyer/Wallet';
import { AdminOverview } from './pages/admin/Overview';

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

          {/* Verifier Routes */}
          <Route path="/verifier/queue" element={<VerifierQueue />} />

          {/* Buyer Routes */}
          <Route path="/buyer/marketplace" element={<Marketplace />} />
          <Route path="/buyer/contract" element={<ContractBuilder />} />
          <Route path="/buyer/forecast" element={<Forecast />} />
          <Route path="/buyer/wallet" element={<Wallet />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

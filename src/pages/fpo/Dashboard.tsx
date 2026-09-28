import React from 'react';
import { useStore } from '../../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Map as MapIcon, TrendingUp, IndianRupee } from 'lucide-react';

const chartData = [
  { month: 'Jan', hectares: 120 },
  { month: 'Feb', hectares: 150 },
  { month: 'Mar', hectares: 210 },
  { month: 'Apr', hectares: 280 },
  { month: 'May', hectares: 320 },
  { month: 'Jun', hectares: 390 },
];

export function FpoDashboard() {
  const { language, farmers } = useStore();
  const fpoFarmers = farmers.filter(f => f.fpoId === 'fpo-1'); // Assume we are logged in as FPO 1
  const totalHectares = fpoFarmers.reduce((sum, f) => sum + f.landAreaHa, 0).toFixed(1);
  const eligibleTco2e = fpoFarmers.filter(f => f.status === 'ELIGIBLE' || f.status === 'POOLED')
    .reduce((sum, f) => sum + (f.estimatedTco2e || 0), 0).toFixed(1);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading text-primary">
        {language === 'en' ? 'FPO Dashboard Overview' : 'एफपीओ डैशबोर्ड'}
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">{language === 'en' ? 'Farmers Onboarded' : 'किसान जोड़े गए'}</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">{fpoFarmers.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <MapIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{language === 'en' ? 'Hectares Enrolled' : 'हेक्टेयर नामांकित'}</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">{totalHectares}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">{language === 'en' ? 'Est. tCO2e/year' : 'अनुमानित tCO2e/वर्ष'}</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">{eligibleTco2e}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <IndianRupee className="w-5 h-5" />
            <span className="text-sm font-medium">{language === 'en' ? 'Pending Payouts' : 'लंबित भुगतान'}</span>
          </div>
          <div className="text-3xl font-heading tabular-nums text-accent">₹1,45,000</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <h3 className="font-medium mb-6">{language === 'en' ? 'Enrolled Hectares Over Time' : 'समय के साथ नामांकित हेक्टेयर'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="hectares" stroke="#1F4D3A" strokeWidth={2} dot={{r: 4, fill: '#1F4D3A'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <h3 className="font-medium mb-4">{language === 'en' ? 'Recent Activity' : 'हाल की गतिविधि'}</h3>
          <div className="space-y-4">
            {fpoFarmers.slice(0, 5).map(farmer => (
              <div key={farmer.id} className="flex justify-between items-center text-sm border-b border-text/5 pb-2 last:border-0">
                <div>
                  <div className="font-medium">{farmer.name}</div>
                  <div className="text-text/60">{farmer.village} • {farmer.landAreaHa} ha</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  farmer.status === 'ELIGIBLE' ? 'bg-green-100 text-green-800' :
                  farmer.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  farmer.status === 'POOLED' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {farmer.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

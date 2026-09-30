import React from 'react';
import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Users, Layers, TrendingUp } from 'lucide-react';

const funnelData = [
  { stage: 'Evidence Collection', count: 12 },
  { stage: 'Under Review', count: 8 },
  { stage: 'Submitted', count: 5 },
  { stage: 'Approved', count: 3 },
];

export function AdminOverview() {
  const { farmers, projects } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading text-primary">Platform Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Total Farmers</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">{farmers.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <Layers className="w-5 h-5" />
            <span className="text-sm font-medium">Active FPOs</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">4</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Credits Issued</span>
          </div>
          <div className="text-3xl font-heading tabular-nums">42,500</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <div className="flex items-center gap-3 text-text/70 mb-2">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-medium">Platform Revenue</span>
          </div>
          <div className="text-3xl font-heading tabular-nums text-accent">₹14.2 L</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm">
          <h3 className="font-medium mb-6">Project Pipeline (Funnel)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#1F4D3A" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm flex flex-col">
          <h3 className="font-medium mb-4">Datacentre Partnerships</h3>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center p-3 bg-text/5 rounded-lg border border-text/10">
              <div>
                <div className="font-medium">TechCorp Data Center</div>
                <div className="text-xs text-text/60">Hyderabad (Tier IV)</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm text-primary">2,500 tCO2e/yr</div>
                <div className="text-xs text-text/50">Active Forward Contract</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-text/5 rounded-lg border border-text/10">
              <div>
                <div className="font-medium">CloudHost India</div>
                <div className="text-xs text-text/60">Pune (Tier III)</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm text-primary">1,200 tCO2e/yr</div>
                <div className="text-xs text-text/50">Spot Buyer</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-text/5 rounded-lg border border-text/10">
              <div>
                <div className="font-medium">GreenServe AWS</div>
                <div className="text-xs text-text/60">Mumbai (Tier IV)</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm text-yellow-600">Pending Setup</div>
                <div className="text-xs text-text/50">Evaluating Pipeline</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-text/10 text-xs text-text/50 flex justify-between">
            <span>Total Datacentres: 3</span>
            <span>Total Locked Volume: 3,700 tCO2e</span>
          </div>
        </div>
      </div>
    </div>
  );
}

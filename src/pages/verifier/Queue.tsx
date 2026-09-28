import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Project } from '../../lib/mockData';
import { CheckCircle, XCircle, FileText, Satellite } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ndviData = [
  { month: 'Jan', ndvi: 0.4 },
  { month: 'Feb', ndvi: 0.42 },
  { month: 'Mar', ndvi: 0.45 },
  { month: 'Apr', ndvi: 0.5 },
  { month: 'May', ndvi: 0.55 },
  { month: 'Jun', ndvi: 0.62 },
];

export function VerifierQueue() {
  const { projects, updateProjectStatus } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <button onClick={() => setSelectedProject(null)} className="text-sm text-primary hover:underline">
          &larr; Back to Queue
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-heading text-primary mb-1">{selectedProject.name}</h2>
            <div className="text-sm text-text/70">{selectedProject.state} • {selectedProject.practice} • Vintage: {selectedProject.vintage}</div>
          </div>
          <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded text-sm font-medium">
            {selectedProject.status.replace(/_/g, ' ')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-4">
            <h3 className="font-medium flex items-center gap-2"><Satellite className="w-5 h-5 text-primary" /> MRV Satellite Time-Series (NDVI)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ndviData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ndvi" stroke="#1F4D3A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-4">
            <h3 className="font-medium flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Evidence Checklist</h3>
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3"><input type="checkbox" checked readOnly className="accent-primary" /> Geofenced plots match title deeds</label>
              <label className="flex items-center gap-3"><input type="checkbox" checked readOnly className="accent-primary" /> Practice baseline established</label>
              <label className="flex items-center gap-3"><input type="checkbox" checked readOnly className="accent-primary" /> Additionality test passed</label>
            </div>
            
            {selectedProject.status === 'UNDER_REVIEW' && (
              <div className="pt-6 mt-6 border-t border-text/10 flex gap-3">
                <button 
                  onClick={() => {
                    updateProjectStatus(selectedProject.id, 'APPROVED');
                    setSelectedProject({...selectedProject, status: 'APPROVED'});
                  }}
                  className="flex-1 py-2 bg-primary text-white rounded-md font-medium flex justify-center items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button className="flex-1 py-2 bg-white border border-text/20 text-text/80 rounded-md font-medium flex justify-center items-center gap-2">
                  <XCircle className="w-4 h-4" /> Request Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading text-primary">Verification Queue</h2>
      <div className="bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-text/5 border-b border-text/10">
            <tr>
              <th className="p-4 font-medium text-text/70">Project Name</th>
              <th className="p-4 font-medium text-text/70">Location</th>
              <th className="p-4 font-medium text-text/70">Volume (tCO2e)</th>
              <th className="p-4 font-medium text-text/70">Status</th>
              <th className="p-4 font-medium text-text/70">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text/5">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-text/5 transition-colors">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-text/70">{p.state}</td>
                <td className="p-4 tabular-nums">{p.estimatedVolume}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    p.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {p.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => setSelectedProject(p)}
                    className="text-primary font-medium hover:underline"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

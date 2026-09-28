import React from 'react';
import { useStore } from '../../store/useStore';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers } from 'lucide-react';

export function Pooling() {
  const { language, farmers, updateFarmerStatus } = useStore();
  const eligibleFarmers = farmers.filter(f => f.fpoId === 'fpo-1' && f.status === 'ELIGIBLE');
  
  const totalArea = eligibleFarmers.reduce((s, f) => s + f.landAreaHa, 0).toFixed(1);
  const totalCarbon = eligibleFarmers.reduce((s, f) => s + (f.estimatedTco2e || 0), 0).toFixed(1);

  const handleApprovePool = () => {
    eligibleFarmers.forEach(f => {
      updateFarmerStatus(f.id, 'POOLED');
    });
    alert('Pool approved! Farmers are now part of a registered project.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading text-primary">
          {language === 'en' ? 'Project Pooling' : 'प्रोजेक्ट पूलिंग'}
        </h2>
        <button 
          onClick={handleApprovePool}
          disabled={eligibleFarmers.length === 0}
          className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium disabled:opacity-50 flex items-center gap-2"
        >
          <Layers className="w-4 h-4" />
          {language === 'en' ? 'Approve Pool' : 'पूल स्वीकृत करें'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden h-[500px] relative z-0">
          <MapContainer center={[15.3173, 75.7139]} zoom={6} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eligibleFarmers.map((f, i) => (
              <CircleMarker 
                key={f.id} 
                center={[15.3173 + (Math.random() - 0.5) * 2, 75.7139 + (Math.random() - 0.5) * 2]} 
                radius={f.landAreaHa * 3}
                pathOptions={{ color: '#1F4D3A', fillColor: '#1F4D3A', fillOpacity: 0.6 }}
              >
                <Popup>
                  <div className="text-sm font-ui">
                    <b>{f.name}</b><br/>
                    {f.landAreaHa} ha • {f.practices[0]}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="bg-white rounded-xl border border-text/10 shadow-sm p-6 flex flex-col">
          <h3 className="font-medium mb-4">Suggested Pool</h3>
          {eligibleFarmers.length === 0 ? (
            <div className="text-sm text-text/60 flex-1 flex items-center justify-center">
              No eligible farmers to pool right now.
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-text/5">
                  <span className="text-text/70 text-sm">Farmers</span>
                  <span className="font-medium">{eligibleFarmers.length}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-text/5">
                  <span className="text-text/70 text-sm">Total Area</span>
                  <span className="font-medium">{totalArea} ha</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-text/5">
                  <span className="text-text/70 text-sm">Est. Output</span>
                  <span className="font-medium">{totalCarbon} tCO2e/yr</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-text/5">
                  <span className="text-text/70 text-sm">Practice</span>
                  <span className="font-medium">Agroforestry</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
                  <p className="text-xs text-text/70">
                    By approving this pool, these farmers will be locked into a single project submission for verification.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Users, Leaf, ArrowLeft } from 'lucide-react';
import { MOCK_FPOS } from '../../lib/mockData';

// Helper component to recenter map
function MapRecenter({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function Pooling() {
  const { farmers } = useStore();
  const [selectedFpoId, setSelectedFpoId] = useState<string | null>(null);

  const selectedFpo = selectedFpoId ? MOCK_FPOS.find(f => f.id === selectedFpoId) : null;
  const fpoFarmers = selectedFpoId ? farmers.filter(f => f.fpoId === selectedFpoId) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading text-primary flex items-center gap-2">
            {selectedFpoId && (
              <button onClick={() => setSelectedFpoId(null)} className="hover:bg-text/5 p-1 rounded-md transition-colors mr-2">
                <ArrowLeft className="w-5 h-5 text-text/70" />
              </button>
            )}
            {selectedFpoId ? selectedFpo?.name : 'FPO Network Map'}
          </h2>
          <p className="text-sm text-text/70 mt-1">
            {selectedFpoId 
              ? 'Viewing enrolled farmers for this FPO.' 
              : 'Overview of all registered FPOs across India.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Left Side: List */}
        <div className="bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-text/10 bg-text/5">
            <h3 className="font-medium text-primary flex items-center gap-2">
              <Users className="w-4 h-4" /> 
              {selectedFpoId ? 'Farmers in FPO' : 'Registered FPOs'}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!selectedFpoId ? (
              // List FPOs
              MOCK_FPOS.map(fpo => (
                <button 
                  key={fpo.id} 
                  onClick={() => setSelectedFpoId(fpo.id)}
                  className="w-full text-left p-4 rounded-lg border border-text/10 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <h4 className="font-medium text-text mb-1">{fpo.name}</h4>
                  <p className="text-xs text-text/60">{fpo.state} • {farmers.filter(f => f.fpoId === fpo.id).length} Farmers</p>
                </button>
              ))
            ) : (
              // List Farmers
              fpoFarmers.map(farmer => (
                <div key={farmer.id} className="p-3 rounded-lg border border-text/10 bg-text/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{farmer.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      farmer.status === 'ELIGIBLE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {farmer.status}
                    </span>
                  </div>
                  <div className="text-xs text-text/60 space-y-1">
                    <div>Area: {farmer.landAreaHa} ha</div>
                    <div>Practice: {farmer.practices.join(', ')}</div>
                    <div className="text-primary font-medium mt-1">Est. {farmer.estimatedTco2e} tCO2e/yr</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden h-full z-0">
          <MapContainer 
            center={selectedFpoId ? [19.0, 75.0] : [22.0, 79.0]} 
            zoom={selectedFpoId ? 7 : 5} 
            className="w-full h-full"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapRecenter 
              center={selectedFpoId ? [19.0, 75.0] : [22.0, 79.0]} 
              zoom={selectedFpoId ? 7 : 5} 
            />

            {!selectedFpoId ? (
              // Show FPOs as big markers
              MOCK_FPOS.map((fpo, i) => (
                <CircleMarker
                  key={fpo.id}
                  center={[22.0 + (i * 2) - 3, 79.0 + (i % 2 === 0 ? 2 : -2)]} // Mock coordinates for demo
                  radius={12}
                  pathOptions={{ fillColor: '#1F4D3A', color: '#fff', weight: 2, fillOpacity: 0.8 }}
                  eventHandlers={{ click: () => setSelectedFpoId(fpo.id) }}
                >
                  <Popup>
                    <div className="font-medium">{fpo.name}</div>
                    <div className="text-xs text-text/70">{fpo.state}</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedFpoId(fpo.id); }}
                      className="mt-2 text-xs text-primary font-medium hover:underline"
                    >
                      View Farmers
                    </button>
                  </Popup>
                </CircleMarker>
              ))
            ) : (
              // Show Farmers as smaller dots
              fpoFarmers.map((farmer, i) => {
                const lat = 19.0 + (Math.random() - 0.5) * 2;
                const lng = 75.0 + (Math.random() - 0.5) * 2;
                return (
                  <CircleMarker
                    key={farmer.id}
                    center={[lat, lng]}
                    radius={6}
                    pathOptions={{ 
                      fillColor: farmer.status === 'ELIGIBLE' ? '#22c55e' : '#eab308', 
                      color: '#fff', weight: 1, fillOpacity: 0.7 
                    }}
                  >
                    <Popup>
                      <div className="font-medium text-sm">{farmer.name}</div>
                      <div className="text-xs text-text/70 mt-1">{farmer.landAreaHa} ha • {farmer.practices[0]}</div>
                    </Popup>
                  </CircleMarker>
                );
              })
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

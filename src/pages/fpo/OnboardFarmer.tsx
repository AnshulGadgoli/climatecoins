import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Farmer } from '../../lib/mockData';
import { MapPin, Satellite, CheckCircle, WifiOff } from 'lucide-react';
import { cn } from '../../lib/utils';

export function OnboardFarmer() {
  const { language, addFarmer } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [result, setResult] = useState<'ELIGIBLE' | 'REJECTED' | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', village: '', landAreaHa: '', crop: '', practices: 'Cover Cropping'
  });

  const [satelliteData, setSatelliteData] = useState<any>(null);

  const simulateFetch = () => {
    setLoading(true);
    setTimeout(() => {
      setSatelliteData({
        ndvi: '0.64 (Healthy)',
        ndmi: '0.45 (Moderate Moisture)',
        soilType: 'Black Cotton',
        socPercent: 0.72,
        ph: 6.8
      });
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleEvaluate = () => {
    const area = parseFloat(formData.landAreaHa);
    // Mock ML rules
    if (area > 0.5 && satelliteData?.socPercent > 0.5) {
      setResult('ELIGIBLE');
    } else {
      setResult('REJECTED');
    }
    setStep(4);
  };

  const handleSave = () => {
    const newFarmer: Farmer = {
      id: `farm-new-${Date.now()}`,
      name: formData.name,
      village: formData.village,
      district: 'Sample District',
      state: 'Karnataka',
      landAreaHa: parseFloat(formData.landAreaHa),
      crop: formData.crop,
      soilType: satelliteData?.soilType || 'Unknown',
      socPercent: satelliteData?.socPercent || 0,
      ph: satelliteData?.ph || 7,
      practices: [formData.practices],
      status: result || 'PENDING',
      estimatedTco2e: result === 'ELIGIBLE' ? parseFloat(formData.landAreaHa) * 2.5 : 0,
      fpoId: 'fpo-1'
    };
    addFarmer(newFarmer);
    // Reset
    setStep(1);
    setFormData({ name: '', village: '', landAreaHa: '', crop: '', practices: 'Cover Cropping' });
    setSatelliteData(null);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading text-primary">
          {language === 'en' ? 'Onboard New Farmer' : 'नया किसान जोड़ें'}
        </h2>
        <button 
          onClick={() => setOfflineMode(!offlineMode)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            offlineMode ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-text/5 text-text/60"
          )}
        >
          <WifiOff className="w-3 h-3" />
          {offlineMode ? 'Offline Mode (Queued)' : 'Online Mode'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-text/10 shadow-sm overflow-hidden">
        {/* Progress bar */}
        <div className="flex border-b border-text/10">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={cn(
              "flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors",
              step >= s ? "border-primary text-primary" : "border-transparent text-text/40"
            )}>
              Step {s}
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-4">Basic Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-text/70 mb-1">Farmer Name</label>
                  <input type="text" className="w-full p-2 border border-text/20 rounded-md focus:outline-none focus:border-primary" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text/70 mb-1">Village</label>
                  <input type="text" className="w-full p-2 border border-text/20 rounded-md focus:outline-none focus:border-primary" 
                    value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text/70 mb-1">Land Area (Hectares)</label>
                  <input type="number" className="w-full p-2 border border-text/20 rounded-md focus:outline-none focus:border-primary" 
                    value={formData.landAreaHa} onChange={e => setFormData({...formData, landAreaHa: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text/70 mb-1">Primary Crop</label>
                  <input type="text" className="w-full p-2 border border-text/20 rounded-md focus:outline-none focus:border-primary" 
                    value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text/70 mb-1">Practice Adopted</label>
                  <select className="w-full p-2 border border-text/20 rounded-md focus:outline-none focus:border-primary"
                    value={formData.practices} onChange={e => setFormData({...formData, practices: e.target.value})}>
                    <option>Cover Cropping</option>
                    <option>No-Till</option>
                    <option>Agroforestry</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.landAreaHa}
                className="mt-6 w-full py-2 bg-primary text-white rounded-md font-medium disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">Location Coordinates</h3>
              <p className="text-sm text-text/70 mb-6">Capture plot boundaries to fetch satellite data.</p>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-sm text-text/60">Fetching multi-spectral satellite data...</p>
                </div>
              ) : (
                <button 
                  onClick={simulateFetch}
                  className="px-6 py-2 bg-text/5 border border-text/10 rounded-md font-medium hover:bg-text/10 flex items-center gap-2 mx-auto"
                >
                  <Satellite className="w-4 h-4" />
                  Fetch Satellite Data
                </button>
              )}
            </div>
          )}

          {step === 3 && satelliteData && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg">Remote Sensing Data Retrieved</h3>
              <div className="grid grid-cols-2 gap-4 bg-text/5 p-4 rounded-lg">
                <div>
                  <div className="text-xs text-text/50 uppercase">NDVI</div>
                  <div className="font-medium">{satelliteData.ndvi}</div>
                </div>
                <div>
                  <div className="text-xs text-text/50 uppercase">NDMI</div>
                  <div className="font-medium">{satelliteData.ndmi}</div>
                </div>
                <div>
                  <div className="text-xs text-text/50 uppercase">Est. SOC %</div>
                  <div className="font-medium">{satelliteData.socPercent}%</div>
                </div>
                <div>
                  <div className="text-xs text-text/50 uppercase">Soil Type</div>
                  <div className="font-medium">{satelliteData.soilType}</div>
                </div>
              </div>
              <button 
                onClick={handleEvaluate}
                className="w-full py-2 bg-primary text-white rounded-md font-medium"
              >
                Run Eligibility Model
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              {result === 'ELIGIBLE' ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-medium text-xl text-green-700 mb-2">Farmer is Eligible</h3>
                  <p className="text-sm text-text/70 mb-4">Estimated {parseFloat(formData.landAreaHa) * 2.5} tCO2e/year potential.</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">X</div>
                  <h3 className="font-medium text-xl text-red-700 mb-2">Not Eligible</h3>
                  <p className="text-sm text-text/70 mb-4">Plot size or baseline SOC does not meet methodology requirements.</p>
                </>
              )}
              
              <button 
                onClick={handleSave}
                className="w-full py-2 bg-primary text-white rounded-md font-medium"
              >
                Save Record
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

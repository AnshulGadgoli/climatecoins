import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Users, FileText, CheckCircle, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export function OnboardFarmer() {
  const [groups, setGroups] = useState<{id: string, name: string}[]>([{ id: 'g1', name: 'Alpha Cluster' }]);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('g1');

  // Form State
  const [formData, setFormData] = useState({
    name: '', fatherSpouse: '', village: '', mandal: '', district: '', phone: '', aadhaar: '', bankUpi: '',
    surveyNo: '', ownership: 'OWN', leaseYears: '', area: '', soilType: '', soilPh: '', organicCarbon: '',
    irrigation: '', rainfall: '', currentCrop: '', previousCrop: '', rotation: 'Yes', fertilizer: '',
    tillage: '', residue: '', manure: '', coverCrop: '', landUseNow: '', landUse5yr: '', treeCover5yr: '',
    forest2000: 'No', income: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      const newGroup = { id: `g${Date.now()}`, name: newGroupName };
      setGroups([...groups, newGroup]);
      setSelectedGroup(newGroup.id);
      setNewGroupName('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Reset form
      setFormData({
        name: '', fatherSpouse: '', village: '', mandal: '', district: '', phone: '', aadhaar: '', bankUpi: '',
        surveyNo: '', ownership: 'OWN', leaseYears: '', area: '', soilType: '', soilPh: '', organicCarbon: '',
        irrigation: '', rainfall: '', currentCrop: '', previousCrop: '', rotation: 'Yes', fertilizer: '',
        tillage: '', residue: '', manure: '', coverCrop: '', landUseNow: '', landUse5yr: '', treeCover5yr: '',
        forest2000: 'No', income: ''
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white p-12 rounded-xl border border-text/10 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading text-primary mb-2">Farmer Added Successfully</h2>
        <p className="text-text/70 mb-8">The farmer and farm details have been saved to {groups.find(g => g.id === selectedGroup)?.name}.</p>
        <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-primary text-white rounded-md font-medium">
          Add Another Farmer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-primary mb-1">Manual Data Entry</h2>
          <p className="text-sm text-text/70">Create groups and manually enter detailed farmer and farm metrics.</p>
        </div>
      </div>

      {/* Group Management */}
      <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-6">
        <h3 className="font-medium flex items-center gap-2 border-b border-text/10 pb-3">
          <Users className="w-5 h-5 text-primary" /> Group Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Select Target Group</label>
            <select 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full p-2.5 border border-text/20 rounded-md focus:outline-none focus:border-primary"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Or Create New Group</label>
            <form onSubmit={handleCreateGroup} className="flex gap-2">
              <input 
                type="text" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="New group name..."
                className="flex-1 p-2.5 border border-text/20 rounded-md focus:outline-none focus:border-primary"
              />
              <button type="submit" className="px-4 py-2.5 bg-text/5 hover:bg-text/10 text-text rounded-md font-medium transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Farmer Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-6">
          <h3 className="font-medium text-primary border-b border-text/10 pb-3">1. Farmer Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text/70 mb-1">Full Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Father/Spouse Name</label>
              <input required name="fatherSpouse" value={formData.fatherSpouse} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Village</label>
              <input required name="village" value={formData.village} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Mandal / Tehsil</label>
              <input required name="mandal" value={formData.mandal} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">District</label>
              <input required name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Aadhaar (Last 4)</label>
              <input required maxLength={4} name="aadhaar" value={formData.aadhaar} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Bank Account / UPI ID</label>
              <input required name="bankUpi" value={formData.bankUpi} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-6">
          <h3 className="font-medium text-primary border-b border-text/10 pb-3">2. Land & Soil Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-text/70 mb-1">Survey Number</label>
              <input required name="surveyNo" value={formData.surveyNo} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Ownership</label>
              <select name="ownership" value={formData.ownership} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md">
                <option value="OWN">Owned</option>
                <option value="LEASE">Leased</option>
                <option value="JOINT">Joint</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Lease Years (if any)</label>
              <input type="number" name="leaseYears" value={formData.leaseYears} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Area (Hectares)</label>
              <input required type="number" step="0.01" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Soil Type</label>
              <input required name="soilType" value={formData.soilType} onChange={handleChange} placeholder="e.g. Black Cotton" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Soil pH</label>
              <input required type="number" step="0.1" name="soilPh" value={formData.soilPh} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Organic Carbon %</label>
              <input required type="number" step="0.01" name="organicCarbon" value={formData.organicCarbon} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Irrigation Source</label>
              <input required name="irrigation" value={formData.irrigation} onChange={handleChange} placeholder="e.g. Borewell" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-6">
          <h3 className="font-medium text-primary border-b border-text/10 pb-3">3. Crops & Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text/70 mb-1">Current Crop</label>
              <input required name="currentCrop" value={formData.currentCrop} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Previous Crop</label>
              <input required name="previousCrop" value={formData.previousCrop} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Crop Rotation</label>
              <select name="rotation" value={formData.rotation} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Fertilizer Used (kg/acre)</label>
              <input required name="fertilizer" value={formData.fertilizer} onChange={handleChange} placeholder="e.g. Urea 50kg" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Tillage Method</label>
              <input required name="tillage" value={formData.tillage} onChange={handleChange} placeholder="e.g. No-Till, Deep" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Residue Management</label>
              <input required name="residue" value={formData.residue} onChange={handleChange} placeholder="e.g. Incorporated, Burnt" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Organic Manure</label>
              <input required name="manure" value={formData.manure} onChange={handleChange} placeholder="e.g. FYM, Vermicompost" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Cover Crop</label>
              <input required name="coverCrop" value={formData.coverCrop} onChange={handleChange} placeholder="e.g. Cowpea, None" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-text/10 shadow-sm space-y-6">
          <h3 className="font-medium text-primary border-b border-text/10 pb-3">4. ARR History & Baseline</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-text/70 mb-1">Land Use Now</label>
              <input required name="landUseNow" value={formData.landUseNow} onChange={handleChange} placeholder="e.g. Agriculture" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Land Use (5 Years Ago)</label>
              <input required name="landUse5yr" value={formData.landUse5yr} onChange={handleChange} placeholder="e.g. Barren" className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Tree Cover (5 Years Ago) %</label>
              <input required type="number" name="treeCover5yr" value={formData.treeCover5yr} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md" />
            </div>
            <div>
              <label className="block text-sm text-text/70 mb-1">Forest after 31 Dec 2000?</label>
              <select name="forest2000" value={formData.forest2000} onChange={handleChange} className="w-full p-2 border border-text/20 rounded-md">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Save Farmer & Farm Data
          </button>
        </div>
      </form>

    </div>
  );
}

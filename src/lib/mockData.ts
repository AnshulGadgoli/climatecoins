export type UserRole = 'FPO' | 'BUYER' | 'VERIFIER' | 'ADMIN' | null;

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  landAreaHa: number;
  crop: string;
  soilType: string;
  socPercent: number;
  ph: number;
  practices: string[];
  status: 'PENDING' | 'ELIGIBLE' | 'REJECTED' | 'POOLED';
  estimatedTco2e?: number; // per yr
  fpoId: string;
}

export interface FPO {
  id: string;
  name: string;
  state: string;
}

export interface Project {
  id: string;
  name: string;
  fpoId: string;
  state: string;
  farmersCount: number;
  totalHectares: number;
  practice: string;
  vintage: string;
  pricePerTco2e: number;
  estimatedVolume: number;
  status: 'POOLING' | 'EVIDENCE_COLLECTION' | 'UNDER_REVIEW' | 'SUBMITTED_TO_VERRA' | 'APPROVED';
}

export interface Transaction {
  id: string;
  date: string;
  projectId: string;
  buyerName: string;
  volume: number;
  price: number;
  status: 'PENDING' | 'COMPLETED';
}

export const MOCK_FPOS: FPO[] = [
  { id: 'fpo-1', name: 'Kisan Samriddhi FPO', state: 'Karnataka' },
  { id: 'fpo-2', name: 'Maharashtra Agro Producers', state: 'Maharashtra' },
  { id: 'fpo-3', name: 'Punjab Green Farmers', state: 'Punjab' },
  { id: 'fpo-4', name: 'Madhya Pradesh Soil Restorers', state: 'Madhya Pradesh' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'KN Agroforestry 2026', fpoId: 'fpo-1', state: 'Karnataka', farmersCount: 15, totalHectares: 32, practice: 'Agroforestry', vintage: '2026', pricePerTco2e: 1800, estimatedVolume: 250, status: 'APPROVED' },
  { id: 'proj-2', name: 'MH No-Till Carbon', fpoId: 'fpo-2', state: 'Maharashtra', farmersCount: 22, totalHectares: 45, practice: 'No-Till Farming', vintage: '2026', pricePerTco2e: 1650, estimatedVolume: 320, status: 'SUBMITTED_TO_VERRA' },
  { id: 'proj-3', name: 'PB Rice Methane Reduction', fpoId: 'fpo-3', state: 'Punjab', farmersCount: 30, totalHectares: 60, practice: 'AWD (Alternate Wetting/Drying)', vintage: '2026', pricePerTco2e: 2100, estimatedVolume: 400, status: 'UNDER_REVIEW' },
  { id: 'proj-4', name: 'MP Organic Transition Phase 1', fpoId: 'fpo-4', state: 'Madhya Pradesh', farmersCount: 18, totalHectares: 35, practice: 'Organic Transition', vintage: '2027', pricePerTco2e: 1500, estimatedVolume: 180, status: 'EVIDENCE_COLLECTION' },
  { id: 'proj-5', name: 'KN Silvopasture Pilot', fpoId: 'fpo-1', state: 'Karnataka', farmersCount: 10, totalHectares: 20, practice: 'Silvopasture', vintage: '2027', pricePerTco2e: 1900, estimatedVolume: 150, status: 'POOLING' },
];

export const generateMockFarmers = (): Farmer[] => {
  const farmers: Farmer[] = [];
  const names = ['Ramesh', 'Suresh', 'Anita', 'Sunita', 'Rajesh', 'Kamlesh', 'Bhim', 'Prakash', 'Lakshmi', 'Narayana'];
  const villages = ['Shirur', 'Baramati', 'Moga', 'Harda', 'Mandya', 'Latur', 'Sangrur', 'Sehore'];
  
  for (let i = 1; i <= 45; i++) {
    const fpo = MOCK_FPOS[i % 4];
    const isEligible = Math.random() > 0.2;
    farmers.push({
      id: `farm-${i}`,
      name: `${names[i % names.length]} ${['Kumar', 'Singh', 'Patil', 'Gowda', 'Kaur'][i % 5]}`,
      village: villages[i % villages.length],
      district: 'Sample District',
      state: fpo.state,
      landAreaHa: Number((Math.random() * 3.5 + 0.5).toFixed(2)),
      crop: ['Cotton', 'Wheat', 'Rice', 'Sugarcane', 'Soybean'][i % 5],
      soilType: ['Black Cotton', 'Alluvial', 'Red Soil', 'Laterite'][i % 4],
      socPercent: Number((Math.random() * 0.8 + 0.4).toFixed(2)),
      ph: Number((Math.random() * 2.7 + 5.5).toFixed(1)),
      practices: [['Cover Cropping'], ['No-Till'], ['Agroforestry']][i % 3],
      status: isEligible ? 'ELIGIBLE' : 'REJECTED',
      estimatedTco2e: isEligible ? Number((Math.random() * 5 + 2).toFixed(1)) : 0,
      fpoId: fpo.id,
    });
  }
  return farmers;
};

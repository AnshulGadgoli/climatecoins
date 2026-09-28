import { create } from 'zustand';
import type { Farmer, FPO, Project, Transaction, UserRole } from '../lib/mockData';
import { MOCK_FPOS, MOCK_PROJECTS, generateMockFarmers } from '../lib/mockData';

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  
  farmers: Farmer[];
  addFarmer: (farmer: Farmer) => void;
  updateFarmerStatus: (id: string, status: Farmer['status']) => void;
  
  projects: Project[];
  updateProjectStatus: (id: string, status: Project['status']) => void;
  
  walletBalance: number;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  language: 'en',
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'hi' : 'en' })),
  
  farmers: generateMockFarmers(),
  addFarmer: (farmer) => set((state) => ({ farmers: [farmer, ...state.farmers] })),
  updateFarmerStatus: (id, status) => set((state) => ({
    farmers: state.farmers.map(f => f.id === id ? { ...f, status } : f)
  })),
  
  projects: MOCK_PROJECTS,
  updateProjectStatus: (id, status) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, status } : p)
  })),
  
  walletBalance: 12500, // mock initial balance
  transactions: [
    { id: 'tx-1', date: '2026-09-01', projectId: 'proj-1', buyerName: 'TechCorp Data Center', volume: 100, price: 180000, status: 'COMPLETED' }
  ],
  addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
}));

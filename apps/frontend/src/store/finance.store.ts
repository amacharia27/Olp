import { create } from 'zustand';

export interface FinancialSummary {
  netBalance: number;
  totalRevenue: number;
  totalExpenses: number;
  collectionRate: number;
  pendingPayments: number;
}

interface FinanceStoreState {
  summary: FinancialSummary | null;
  setFinancialSummary: (summary: FinancialSummary) => void;
}

export const useFinanceStore = create<FinanceStoreState>((set) => ({
  summary: null,
  setFinancialSummary: (summary) => set({ summary }),
}));

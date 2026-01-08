export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type?: 'checking' | 'savings' | 'crypto' | 'investment';
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  walletId?: string;
  status?: 'pending' | 'completed' | 'failed';
}

export interface Category {
  id: string;
  key: string;
  icon: string;
  color?: string;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  value?: number;
}

export interface BudgetItem {
  category: string;
  spent: number;
  budget: number;
  color: string;
  percentage?: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}
// ============================================
// TIPOS DO SISTEMA
// ============================================

export interface Card {
  id: string;
  name: string;
  limit: number;
  color: CardColor;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  dueDate: number; // Dia do vencimento (1-31)
  nextRecharge: string; // Data da próxima recarga
}

export type CardColor = 'red' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'yellow' | 'teal';

export interface Expense {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'bills'
  | 'other';

export interface CardStats {
  totalSpent: number;
  availableLimit: number;
  usagePercentage: number;
  transactionCount: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSaved: number;
  savingsPercentage: number;
}

export type ViewType = 'dashboard' | 'cards' | 'expenses';

export interface Card {
  id: string;
  name: string;
  limit: number;
  color: CardColor;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  nextRecharge?: string;
}

export type CardColor = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';

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
  | 'almoco'
  | 'almoco_baratinho'
  | 'lanche'
  | 'fastfood'
  | 'almoco_sobremesa'
  | 'sobremesa'
  | 'viver_vida'
  | 'geral';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface CardStats {
  totalSpent: number;
  availableLimit: number;
  usagePercentage: number;
  transactionCount: number;
}

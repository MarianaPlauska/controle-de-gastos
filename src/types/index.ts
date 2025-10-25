export interface Card {
  id: string;
  name: string;
  limit: number;
  color: CardColor;
  cardNumber?: string;
  cardHolder?: string;
  dueDate?: number;
}

export type CardColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'red' | 'yellow' | 'teal';

export interface Expense {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
}

export type ExpenseCategory = 'almoco' | 'lanche' | 'besteira' | 'compra_especial';

export interface Income {
  id: string;
  description: string;
  amount: number;
  type: IncomeType;
  date: string;
}

export type IncomeType = 'salario' | 'vr' | 'extra' | 'investimento';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  date: string;
  read: boolean;
}

export interface CardStats {
  totalSpent: number;
  availableLimit: number;
  usagePercentage: number;
  transactionCount: number;
}

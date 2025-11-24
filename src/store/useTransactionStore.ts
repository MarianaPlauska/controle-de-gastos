import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    category: string;
    cardId?: string;
}

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    removeTransaction: (id: string) => void;
    getTotals: () => { balance: number; income: number; expenses: number };
}

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            transactions: [
                { id: '1', title: 'Salário', amount: 8500, date: new Date().toISOString(), type: 'income', category: 'Salário' },
                { id: '2', title: 'Aluguel', amount: 2500, date: new Date().toISOString(), type: 'expense', category: 'Moradia' },
                { id: '3', title: 'Supermercado', amount: 450.20, date: new Date().toISOString(), type: 'expense', category: 'Alimentação' },
            ],
            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        { ...transaction, id: Math.random().toString(36).substr(2, 9) },
                        ...state.transactions,
                    ],
                })),
            removeTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),
            getTotals: () => {
                const { transactions } = get();
                const income = transactions
                    .filter((t) => t.type === 'income')
                    .reduce((acc, curr) => acc + curr.amount, 0);
                const expenses = transactions
                    .filter((t) => t.type === 'expense')
                    .reduce((acc, curr) => acc + curr.amount, 0);
                return {
                    income,
                    expenses,
                    balance: income - expenses,
                };
            },
        }),
        {
            name: 'transaction-storage',
        }
    )
);

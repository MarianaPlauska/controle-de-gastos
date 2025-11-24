import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CreditCard {
    id: string;
    name: string;
    nickname?: string;
    lastDigits: string;
    lastDigits: string;
    limit: number;
    brand: string;
    color: string;
}

export interface MealVoucher {
    id: string;
    company: string;
    balance: number;
    dailyAllowance?: number;
    color: string;
}

interface CardState {
    cards: CreditCard[];
    vouchers: MealVoucher[];
    addCard: (card: Omit<CreditCard, 'id'>) => void;
    removeCard: (id: string) => void;
    addVoucher: (voucher: Omit<MealVoucher, 'id'>) => void;
    removeVoucher: (id: string) => void;
    updateCard: (id: string, updates: Partial<CreditCard>) => void;
}

export const useCardStore = create<CardState>()(
    persist(
        (set) => ({
            cards: [
                {
                    id: '1',
                    name: 'MARIANA PLAUSKA',
                    lastDigits: '4242',
                    limit: 12000,
                    brand: 'Mastercard',
                    color: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                },
                {
                    id: '2',
                    name: 'MARIANA PLAUSKA',
                    lastDigits: '8899',
                    limit: 5500,
                    brand: 'Nubank',
                    color: 'linear-gradient(135deg, #82269e 0%, #a43dbc 100%)',
                },
            ],
            vouchers: [
                {
                    id: '1',
                    company: 'Ticket Restaurante',
                    balance: 450,
                    dailyAllowance: 45,
                    color: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
                },
            ],
            addCard: (card) =>
                set((state) => ({
                    cards: [...state.cards, { ...card, id: Math.random().toString(36).substr(2, 9) }],
                })),
            removeCard: (id) =>
                set((state) => ({
                    cards: state.cards.filter((c) => c.id !== id),
                })),
            addVoucher: (voucher) =>
                set((state) => ({
                    vouchers: [...state.vouchers, { ...voucher, id: Math.random().toString(36).substr(2, 9) }],
                })),
            removeVoucher: (id) =>
                set((state) => ({
                    vouchers: state.vouchers.filter((v) => v.id !== id),
                })),
            updateCard: (id, updates) =>
                set((state) => ({
                    cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
                })),
        }),
        {
            name: 'card-storage',
        }
    )
);

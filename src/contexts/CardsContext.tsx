import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Card, Expense, CardStats } from '../types';

const STORAGE_KEYS = {
  CARDS: 'fincontrol_cards',
  EXPENSES: 'fincontrol_expenses',
  ACTIVE_CARD: 'fincontrol_active_card',
};

interface CardsContextType {
  cards: Card[];
  activeCard: Card;
  activeCardId: string;
  expenses: Expense[];
  allExpenses: Expense[];
  addCard: (cardData: Omit<Card, 'id'>) => string;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  switchCard: (cardId: string) => void;
  addExpense: (expenseData: Omit<Expense, 'id' | 'createdAt' | 'cardId'>) => void;
  deleteExpense: (expenseId: string) => void;
  getCardStats: (cardId?: string) => CardStats;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
    return saved ? JSON.parse(saved) : [{
      id: '1',
      name: 'Meu Cartão',
      limit: 1000,
      color: 'purple' as const,
      cardNumber: '',
      cardHolder: '',
      dueDate: 10
    }];
  });

  const [activeCardId, setActiveCardId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CARD) || '1';
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CARD, activeCardId);
  }, [activeCardId]);

  const activeCard = cards.find(card => card.id === activeCardId) || cards[0];

  const addCard = (cardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards(prev => [...prev, newCard]);
    return newCard.id;
  };

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    ));
  };

  const deleteCard = (cardId: string) => {
    if (cards.length <= 1) return;
    setCards(prev => prev.filter(card => card.id !== cardId));
    if (activeCardId === cardId) {
      setActiveCardId(cards.find(c => c.id !== cardId)?.id || cards[0].id);
    }
  };

  const switchCard = (cardId: string) => {
    setActiveCardId(cardId);
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'cardId'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      cardId: activeCardId,
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  };

  const getCardStats = (cardId?: string): CardStats => {
    const targetCardId = cardId || activeCardId;
    const cardExpenses = expenses.filter(e => e.cardId === targetCardId);
    const totalSpent = cardExpenses.reduce((sum, e) => sum + e.amount, 0);
    const card = cards.find(c => c.id === targetCardId);
    const limit = card?.limit || 0;
    const availableLimit = limit - totalSpent;
    const usagePercentage = limit > 0 ? (totalSpent / limit) * 100 : 0;

    return {
      totalSpent,
      availableLimit,
      usagePercentage,
      transactionCount: cardExpenses.length,
    };
  };

  const activeCardExpenses = expenses.filter(e => e.cardId === activeCardId);

  return (
    <CardsContext.Provider value={{
      cards,
      activeCard,
      activeCardId,
      expenses: activeCardExpenses,
      allExpenses: expenses,
      addCard,
      updateCard,
      deleteCard,
      switchCard,
      addExpense,
      deleteExpense,
      getCardStats,
    }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards must be used within CardsProvider');
  }
  return context;
};

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Expense, CardStats } from '../types';

const STORAGE_KEYS = {
  CARDS: 'fincontrol_cards',
  EXPENSES: 'fincontrol_expenses',
  ACTIVE_CARD: 'fincontrol_active_card',
};

export const useCards = () => {
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
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CARD) || cards[0]?.id || '1';
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    console.log('useEffect - Salvando expenses no localStorage:', expenses.length, expenses);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CARD, activeCardId);
  }, [activeCardId]);

  const activeCard = cards.find(card => card.id === activeCardId) || cards[0];

  const addCard = useCallback((cardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards(prev => [...prev, newCard]);
    return newCard.id;
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    ));
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    if (cards.length <= 1) return;
    setCards(prev => prev.filter(card => card.id !== cardId));
    if (activeCardId === cardId) {
      setActiveCardId(cards.find(c => c.id !== cardId)?.id || cards[0].id);
    }
  }, [cards, activeCardId]);

  const switchCard = useCallback((cardId: string) => {
    setActiveCardId(cardId);
  }, []);

  const addExpense = useCallback((expenseData: Omit<Expense, 'id' | 'createdAt' | 'cardId'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      cardId: activeCardId,
      createdAt: new Date().toISOString(),
    };
    console.log('addExpense - Criando expense:', newExpense);
    
    setExpenses((prevExpenses) => {
      console.log('addExpense - Estado ANTERIOR:', prevExpenses);
      const updated = [newExpense, ...prevExpenses];
      console.log('addExpense - Estado NOVO:', updated);
      return updated;
    });
  }, [activeCardId]);

  const deleteExpense = useCallback((expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  }, []);

  const getCardStats = useCallback((cardId?: string): CardStats => {
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
  }, [activeCardId, expenses, cards]);

  const activeCardExpenses = useMemo(() => {
    console.log('useMemo - Recalculando expenses. Total:', expenses.length, 'activeCardId:', activeCardId);
    const filtered = expenses.filter(e => {
      const match = e.cardId === activeCardId;
      console.log('Expense:', e.id, 'cardId:', e.cardId, 'vs', activeCardId, '=', match);
      return match;
    });
    console.log('useMemo - Filtered expenses:', filtered.length);
    return filtered;
  }, [expenses, activeCardId]);

  return {
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
  };
};

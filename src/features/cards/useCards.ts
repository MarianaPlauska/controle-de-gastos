import { useState, useEffect, useCallback } from 'react';
import { Card, Expense, CardStats } from '../../types';

const STORAGE_KEY = 'cards_data';
const EXPENSES_KEY = 'expenses_data';
const ACTIVE_CARD_KEY = 'active_card_id';

export const useCards = () => {
  // Estado dos cartões
  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [{
      id: '1',
      name: 'Cartão Principal',
      limit: 1000,
      color: 'red' as const,
      cardNumber: '**** **** **** 1234',
      cardHolder: 'SEU NOME',
      expiryDate: '12/28',
      dueDate: 10,
      nextRecharge: '2025-11-10'
    }];
  });

  const [activeCardId, setActiveCardId] = useState<string>(() => {
    return localStorage.getItem(ACTIVE_CARD_KEY) || cards[0]?.id || '1';
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(EXPENSES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_CARD_KEY, activeCardId);
  }, [activeCardId]);

  // Cartão ativo
  const activeCard = cards.find(card => card.id === activeCardId) || cards[0];

  // Adicionar cartão
  const addCard = useCallback((cardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards(prev => [...prev, newCard]);
    return newCard.id;
  }, []);

  // Atualizar cartão
  const updateCard = useCallback((cardId: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, ...updates } : card
    ));
  }, []);

  // Deletar cartão
  const deleteCard = useCallback((cardId: string) => {
    if (cards.length <= 1) {
      alert('Você precisa ter pelo menos um cartão!');
      return;
    }
    setCards(prev => prev.filter(card => card.id !== cardId));
    // Deletar gastos do cartão
    setExpenses(prev => prev.filter(expense => expense.cardId !== cardId));
    // Trocar para outro cartão se o ativo foi deletado
    if (activeCardId === cardId) {
      const remainingCard = cards.find(c => c.id !== cardId);
      if (remainingCard) {
        setActiveCardId(remainingCard.id);
      }
    }
  }, [cards, activeCardId]);

  // Trocar cartão ativo
  const switchCard = useCallback((cardId: string) => {
    setActiveCardId(cardId);
  }, []);

  // Adicionar gasto
  const addExpense = useCallback((expenseData: Omit<Expense, 'id' | 'createdAt' | 'cardId'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      cardId: activeCardId,
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  }, [activeCardId]);

  // Deletar gasto
  const deleteExpense = useCallback((expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  }, []);

  // Calcular estatísticas do cartão
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

  // Gastos do cartão ativo
  const activeCardExpenses = expenses
    .filter(e => e.cardId === activeCardId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Todos os gastos ordenados
  const allExpensesSorted = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    // Estado
    cards,
    activeCard,
    activeCardId,
    expenses: activeCardExpenses,
    allExpenses: allExpensesSorted,

    // Ações de cartão
    addCard,
    updateCard,
    deleteCard,
    switchCard,

    // Ações de gasto
    addExpense,
    deleteExpense,

    // Estatísticas
    getCardStats,
  };
};

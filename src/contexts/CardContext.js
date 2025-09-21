import React, { createContext, useContext, useState, useEffect } from 'react';

const CardContext = createContext();

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('allCards');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      name: 'Cartão Principal',
      limit: 500,
      nextRecharge: new Date().toISOString().split('T')[0],
      cardNumber: '**** **** **** 1234',
      cardHolder: 'SEU NOME',
      expiryDate: '12/25',
      color: 'red',
      isActive: true
    }];
  });

  const [activeCardId, setActiveCardId] = useState(() => {
    const saved = localStorage.getItem('activeCardId');
    return saved ? parseInt(saved) : 1;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('creditCardExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  // Cartão ativo atual
  const cardData = cards.find(card => card.id === activeCardId) || cards[0];

  useEffect(() => {
    localStorage.setItem('allCards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('activeCardId', activeCardId.toString());
  }, [activeCardId]);

  useEffect(() => {
    localStorage.setItem('creditCardExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      cardId: activeCardId
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateCardData = (newData) => {
    setCards(prev => prev.map(card => 
      card.id === activeCardId 
        ? { ...card, ...newData }
        : card
    ));
  };

  const addCard = (cardInfo) => {
    const newCard = {
      id: Date.now(),
      name: cardInfo.name || 'Novo Cartão',
      limit: cardInfo.limit || 500,
      nextRecharge: cardInfo.nextRecharge || new Date().toISOString().split('T')[0],
      cardNumber: cardInfo.cardNumber || '**** **** **** ****',
      cardHolder: cardInfo.cardHolder || 'SEU NOME',
      expiryDate: cardInfo.expiryDate || '12/25',
      color: cardInfo.color || 'blue',
      isActive: true
    };
    setCards(prev => [...prev, newCard]);
    return newCard.id;
  };

  const deleteCard = (cardId) => {
    if (cards.length <= 1) return; // Não permite deletar o último cartão
    setCards(prev => prev.filter(card => card.id !== cardId));
    if (activeCardId === cardId) {
      const remainingCards = cards.filter(card => card.id !== cardId);
      setActiveCardId(remainingCards[0].id);
    }
  };

  const switchCard = (cardId) => {
    setActiveCardId(cardId);
  };

  const getTotalSpent = (cardId = activeCardId) => {
    return expenses
      .filter(expense => expense.cardId === cardId)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getAvailableLimit = (cardId = activeCardId) => {
    const card = cards.find(c => c.id === cardId) || cardData;
    return card.limit - getTotalSpent(cardId);
  };

  const getUsagePercentage = (cardId = activeCardId) => {
    const card = cards.find(c => c.id === cardId) || cardData;
    return (getTotalSpent(cardId) / card.limit) * 100;
  };

  // Gastos apenas do cartão ativo
  const activeCardExpenses = expenses.filter(expense => expense.cardId === activeCardId);

  return (
    <CardContext.Provider value={{
      cardData,
      cards,
      activeCardId,
      expenses: activeCardExpenses,
      addExpense,
      deleteExpense,
      updateCardData,
      addCard,
      deleteCard,
      switchCard,
      getTotalSpent,
      getAvailableLimit,
      getUsagePercentage
    }}>
      {children}
    </CardContext.Provider>
  );
}; 
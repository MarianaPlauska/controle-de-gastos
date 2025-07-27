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
  const [cardData, setCardData] = useState(() => {
    const saved = localStorage.getItem('cardData');
    return saved ? JSON.parse(saved) : {
      limit: 500,
      nextRecharge: new Date().toISOString().split('T')[0],
      cardNumber: '**** **** **** 1234',
      cardHolder: 'SEU NOME',
      expiryDate: '12/25'
    };
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('creditCardExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(cardData));
  }, [cardData]);

  useEffect(() => {
    localStorage.setItem('creditCardExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateCardData = (newData) => {
    console.log('Updating card data:', newData); // Debug
    setCardData(prev => {
      const updated = { ...prev, ...newData };
      console.log('Updated card data:', updated); // Debug
      return updated;
    });
  };

  const getTotalSpent = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getAvailableLimit = () => {
    return cardData.limit - getTotalSpent();
  };

  const getUsagePercentage = () => {
    return (getTotalSpent() / cardData.limit) * 100;
  };

  return (
    <CardContext.Provider value={{
      cardData,
      expenses,
      addExpense,
      deleteExpense,
      updateCardData,
      getTotalSpent,
      getAvailableLimit,
      getUsagePercentage
    }}>
      {children}
    </CardContext.Provider>
  );
}; 
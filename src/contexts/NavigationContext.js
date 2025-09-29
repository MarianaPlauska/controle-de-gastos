import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [currentExpenseCategory, setCurrentExpenseCategory] = useState('almoco');

  const views = {
    home: 'Início',
    expenses: 'Gastos',
    cards: 'Cartões',
    health: 'Saúde',
    reminders: 'Lembretes',
    todos: 'Tarefas',
    notes: 'Anotações',
    settings: 'Configurações'
  };

  const expenseCategories = {
    almoco: 'Almoço',
    almoco_baratinho: 'Almoço Baratinho',
    lanche: 'Lanche',
    fastfood: 'Fast-Food',
    almoco_sobremesa: 'Almoço com Sobremesa',
    sobremesa: 'Sobremesa',
    viver_vida: 'Viver a Vida',
    geral: 'Geral'
  };

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const setExpenseCategory = (category) => {
    setCurrentExpenseCategory(category);
  };

  return (
    <NavigationContext.Provider value={{
      currentView,
      currentExpenseCategory,
      views,
      expenseCategories,
      navigateTo,
      setExpenseCategory
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
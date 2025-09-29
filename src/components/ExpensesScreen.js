import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useCard } from '../contexts/CardContext';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ChartsSection from './ChartsSection';
import { 
  ShoppingCart, 
  Car, 
  Utensils, 
  Coffee, 
  Heart, 
  GraduationCap,
  Package,
  MoreHorizontal,
  Settings,
  Plus,
  Edit3,
  Save,
  X
} from 'lucide-react';
import './ExpensesScreen.css';

const ExpensesScreen = () => {
  const { currentExpenseCategory, setExpenseCategory, expenseCategories } = useNavigation();
  const { expenses } = useCard();
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);

  const categoryIcons = {
    geral: Package,
    mercado: ShoppingCart,
    compras: Package,
    transporte: Car,
    alimentacao: Utensils,
    lazer: Coffee,
    saude: Heart,
    educacao: GraduationCap
  };

  const categoryColors = {
    geral: '#64748b',
    mercado: '#22c55e',
    compras: '#8b5cf6',
    transporte: '#3b82f6',
    alimentacao: '#f59e0b',
    lazer: '#ec4899',
    saude: '#ef4444',
    educacao: '#06b6d4'
  };

  // Filtrar gastos por categoria
  const filteredExpenses = expenses.filter(expense => 
    expense.category === currentExpenseCategory || 
    (!expense.category && currentExpenseCategory === 'geral')
  );

  const getTotalByCategory = (category) => {
    return expenses
      .filter(expense => expense.category === category || (!expense.category && category === 'geral'))
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="expenses-screen">
      <div className="screen-header">
        <div className="header-content">
          <div>
            <h1>Controle de Gastos</h1>
            <p>Organize seus gastos por categoria</p>
          </div>
          <button 
            className="category-settings-btn"
            onClick={() => setShowCategoryEditor(!showCategoryEditor)}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="categories-scroll">
        <div className="categories-list">
          {Object.entries(expenseCategories).map(([key, label]) => {
            const IconComponent = categoryIcons[key] || MoreHorizontal;
            const isActive = currentExpenseCategory === key;
            const total = getTotalByCategory(key);
            
            return (
              <div
                key={key}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => setExpenseCategory(key)}
                style={{ 
                  borderColor: isActive ? categoryColors[key] : '#e2e8f0',
                  background: isActive ? `${categoryColors[key]}15` : '#ffffff'
                }}
              >
                <div 
                  className="category-icon"
                  style={{ 
                    background: isActive ? categoryColors[key] : '#f1f5f9',
                    color: isActive ? '#ffffff' : categoryColors[key]
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div className="category-info">
                  <h3>{label}</h3>
                  <p>{formatCurrency(total)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="current-category">
        <div className="category-header">
          <div className="category-title">
            {React.createElement(categoryIcons[currentExpenseCategory] || MoreHorizontal, { size: 24 })}
            <h2>{expenseCategories[currentExpenseCategory]}</h2>
          </div>
          <div className="category-total">
            {formatCurrency(getTotalByCategory(currentExpenseCategory))}
          </div>
        </div>
      </div>

      <div className="expenses-content">
        <div className="expense-form-section">
          <ExpenseForm defaultCategory={currentExpenseCategory} />
        </div>

        {filteredExpenses.length > 0 && (
          <>
            <div className="charts-section">
              <ChartsSection expenses={filteredExpenses} />
            </div>
            
            <div className="expenses-list-section">
              <ExpenseList expenses={filteredExpenses} />
            </div>
          </>
        )}

        {filteredExpenses.length === 0 && (
          <div className="empty-category">
            <div className="empty-icon">
              {React.createElement(categoryIcons[currentExpenseCategory] || MoreHorizontal, { size: 48 })}
            </div>
            <h3>Nenhum gasto em {expenseCategories[currentExpenseCategory]}</h3>
            <p>Adicione seu primeiro gasto nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesScreen;
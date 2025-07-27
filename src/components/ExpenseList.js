import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import './ExpenseList.css';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useCard();

  const categoryColors = {
    almoco_baratinho: '#4CAF50',
    almoco: '#2196F3',
    lanche: '#FFC107',
    fast_food: '#FF5722',
    lanche_sobremesa: '#E91E63',
    aproveitar_vida: '#9C27B0'
  };

  const categoryNames = {
    almoco_baratinho: 'Almoço baratinho',
    almoco: 'Almoço',
    lanche: 'Lanche',
    fast_food: 'Fast-food',
    lanche_sobremesa: 'Lanche com sobremesa',
    aproveitar_vida: 'Aproveitar a vida'
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <h3>Gastos Recentes</h3>
        <div className="empty-state">
          <p>Nenhum gasto registrado ainda.</p>
          <span>Adicione seu primeiro gasto usando o formulário acima.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h3>Gastos Recentes</h3>
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-header">
              <div className="expense-date">
                {formatDate(expense.date)}
              </div>
              <div className="expense-amount">
                {formatCurrency(expense.amount)}
              </div>
            </div>
            
            <div className="expense-details">
              <div className="expense-description">
                <span 
                  className="category-dot"
                  style={{ backgroundColor: categoryColors[expense.category] }}
                />
                {expense.description}
              </div>
              <div className="expense-category">
                {categoryNames[expense.category]}
              </div>
            </div>
            
            <div className="expense-actions">
              <button
                className="delete-button"
                onClick={() => deleteExpense(expense.id)}
                aria-label="Excluir gasto"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList; 
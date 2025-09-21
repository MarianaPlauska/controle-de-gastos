import React, { useState, useEffect } from 'react';
import { Plus, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import { useNavigation } from '../contexts/NavigationContext';
import './ExpenseForm.css';

const ExpenseForm = ({ defaultCategory }) => {
  const { getAvailableLimit, addExpense } = useCard();
  const { expenseCategories } = useNavigation();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: defaultCategory || 'geral'
  });

  useEffect(() => {
    if (defaultCategory) {
      setFormData(prev => ({ ...prev, category: defaultCategory }));
    }
  }, [defaultCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    if (amount > getAvailableLimit()) {
      alert(`Este gasto excederá seu limite disponível de R$${getAvailableLimit().toFixed(2)}`);
      return;
    }

    addExpense({
      ...formData,
      amount
    });

    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: defaultCategory || 'geral'
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="expense-form-container">
      <h3>Adicionar Gasto</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">
              <FileText size={14} />
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Ex: Almoço no restaurante"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">
              <DollarSign size={14} />
              Valor (R$)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <Calendar size={14} />
              Data
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">
              <Tag size={14} />
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {Object.entries(expenseCategories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          <Plus size={18} />
          Adicionar Gasto
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm; 
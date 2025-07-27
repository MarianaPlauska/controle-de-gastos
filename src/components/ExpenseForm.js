import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const { cardData, getAvailableLimit, addExpense } = useCard();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'almoco'
  });

  const categories = [
    { value: 'almoco_baratinho', label: 'Almoço baratinho', color: '#4CAF50' },
    { value: 'almoco', label: 'Almoço', color: '#2196F3' },
    { value: 'lanche', label: 'Lanche', color: '#FFC107' },
    { value: 'fast_food', label: 'Fast-food', color: '#FF5722' },
    { value: 'lanche_sobremesa', label: 'Lanche com sobremesa', color: '#E91E63' },
    { value: 'aproveitar_vida', label: 'Aproveitar a vida', color: '#9C27B0' }
  ];

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
      category: 'almoco'
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
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
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
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCards } from '../../contexts/CardsContext';
import { useTheme } from '../../hooks/useTheme';
import { ExpenseCategory } from '../../types';
import './ExpenseForm.css';

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose }) => {
  const { addExpense } = useCards();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'almoco' as ExpenseCategory,
  });

  const categories = [
    { value: 'almoco', label: 'Almoço' },
    { value: 'lanche', label: 'Lanche' },
    { value: 'besteira', label: 'Besteira' },
    { value: 'compra_especial', label: 'Compra Especial' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ background: theme.bg.secondary }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ borderColor: theme.border }}>
          <h2 style={{ color: theme.text.primary }}>Adicionar Gasto</h2>
          <button 
            className="close-btn"
            style={{ background: theme.bg.tertiary, color: theme.text.secondary }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Descrição</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ex: Almoço no restaurante"
              required
              style={{ 
                background: theme.bg.tertiary, 
                color: theme.text.primary,
                borderColor: theme.border 
              }}
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Categoria</label>
            <div className="category-grid">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`category-btn ${formData.category === cat.value ? 'active' : ''}`}
                  style={{
                    background: formData.category === cat.value ? theme.purple.primary : theme.bg.tertiary,
                    color: formData.category === cat.value ? 'white' : theme.text.primary,
                    borderColor: theme.border,
                  }}
                  onClick={() => setFormData({ ...formData, category: cat.value as ExpenseCategory })}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0,00"
              required
              style={{ 
                background: theme.bg.tertiary, 
                color: theme.text.primary,
                borderColor: theme.border 
              }}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            style={{ background: theme.purple.primary }}
          >
            <Check size={20} />
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

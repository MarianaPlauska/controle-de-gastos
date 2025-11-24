import React, { useState } from 'react';
import { X, Check, Utensils, Coffee, ShoppingBag, Star, Calendar } from 'lucide-react';
import { ExpenseCategory } from '../../types';
import { useCards } from '../../contexts/CardsContext';
import { useTheme } from '../../hooks/useTheme';
import * as S from './styles';

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose }) => {
  const { addExpense, activeCardId } = useCards();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'almoco' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
  });

  const categories: { id: ExpenseCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'almoco', label: 'Almoço', icon: <Utensils size={20} />, color: '#ef4444' },
    { id: 'lanche', label: 'Lanche', icon: <Coffee size={20} />, color: '#f97316' },
    { id: 'besteira', label: 'Lazer', icon: <ShoppingBag size={20} />, color: '#8b5cf6' },
    { id: 'compra_especial', label: 'Especial', icon: <Star size={20} />, color: '#eab308' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCardId) return;

    addExpense(activeCardId, {
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Novo Gasto</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <S.AmountInputContainer>
            <S.CurrencyLabel>R$</S.CurrencyLabel>
            <S.AmountInput
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              autoFocus
              required
            />
          </S.AmountInputContainer>

          <S.FormGroup>
            <S.Label>Descrição</S.Label>
            <S.Input
              type="text"
              placeholder="O que você comprou?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Data</S.Label>
            <S.DateInputContainer>
              <S.DateIcon>
                <Calendar size={20} />
              </S.DateIcon>
              <S.DateInput
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </S.DateInputContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Categoria</S.Label>
            <S.CategoryGrid>
              {categories.map((cat) => (
                <S.CategoryButton
                  key={cat.id}
                  type="button"
                  $active={formData.category === cat.id}
                  $color={cat.color}
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                >
                  <S.CategoryIcon $color={cat.color}>
                    {cat.icon}
                  </S.CategoryIcon>
                  <S.CategoryLabel>{cat.label}</S.CategoryLabel>
                </S.CategoryButton>
              ))}
            </S.CategoryGrid>
          </S.FormGroup>

          <S.SubmitButton type="submit">
            <Check size={20} />
            Adicionar Gasto
          </S.SubmitButton>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

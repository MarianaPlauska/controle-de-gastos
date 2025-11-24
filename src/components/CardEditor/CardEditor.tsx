import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Card, CardColor } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import * as S from './styles';

interface CardEditorProps {
  card: Card;
  onSave: (updates: Partial<Card>) => void;
  onClose: () => void;
}

export const CardEditor: React.FC<CardEditorProps> = ({ card, onSave, onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: card.name,
    limit: card.limit.toString(),
    color: card.color,
    cardHolder: card.cardHolder || '',
    cardNumber: card.cardNumber || '',
    dueDate: card.dueDate?.toString() || '',
  });

  const colors: { value: CardColor; label: string; hex: string }[] = [
    { value: 'purple', label: 'Roxo', hex: '#8b5cf6' },
    { value: 'blue', label: 'Azul', hex: '#3b82f6' },
    { value: 'green', label: 'Verde', hex: '#10b981' },
    { value: 'orange', label: 'Laranja', hex: '#f97316' },
    { value: 'pink', label: 'Rosa', hex: '#ec4899' },
    { value: 'red', label: 'Vermelho', hex: '#ef4444' },
    { value: 'yellow', label: 'Amarelo', hex: '#eab308' },
    { value: 'teal', label: 'Azul Turquesa', hex: '#14b8a6' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      limit: parseFloat(formData.limit),
      color: formData.color,
      cardHolder: formData.cardHolder,
      cardNumber: formData.cardNumber,
      dueDate: formData.dueDate ? parseInt(formData.dueDate) : undefined,
    });
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Editar Cartão</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>Nome do Cartão</S.Label>
            <S.Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Limite (R$)</S.Label>
            <S.Input
              type="number"
              step="0.01"
              min="0"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Titular (opcional)</S.Label>
            <S.Input
              type="text"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
              placeholder="Seu nome"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Últimos 4 dígitos (opcional)</S.Label>
            <S.Input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              placeholder="1234"
              maxLength={4}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Dia do Vencimento</S.Label>
            <S.Input
              type="number"
              min="1"
              max="31"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              placeholder="Ex: 10"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Cor do Cartão</S.Label>
            <S.ColorGrid>
              {colors.map((color) => (
                <S.ColorOption
                  key={color.value}
                  type="button"
                  $color={color.hex}
                  $selected={formData.color === color.value}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  aria-label={color.label}
                >
                  {formData.color === color.value && <Check size={14} />}
                </S.ColorOption>
              ))}
            </S.ColorGrid>
          </S.FormGroup>

          <S.SubmitButton type="submit">
            <Check size={20} />
            Salvar Alterações
          </S.SubmitButton>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

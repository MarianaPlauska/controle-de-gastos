import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CardColor } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import * as S from './styles';

interface AddCardModalProps {
  onAdd: (cardData: { name: string; limit: number; color: CardColor; dueDate: number }) => void;
  onClose: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({ onAdd, onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    limit: '1000',
    color: 'blue' as CardColor,
    dueDate: '10',
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
    onAdd({
      name: formData.name,
      limit: parseFloat(formData.limit),
      color: formData.color,
      dueDate: parseInt(formData.dueDate),
    });
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Novo Cartão</S.Title>
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
              placeholder="Ex: Cartão Nubank"
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
            <S.Label>Dia do Vencimento</S.Label>
            <S.Input
              type="number"
              min="1"
              max="31"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              placeholder="Ex: 10"
              required
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
            Criar Cartão
          </S.SubmitButton>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

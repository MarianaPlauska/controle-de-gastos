import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Card, CardColor } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import './CardEditor.css';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ background: theme.bg.card }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: theme.bg.card, borderColor: theme.border }}>
          <h2 style={{ color: theme.text.primary }}>Editar Cartão</h2>
          <button className="close-btn" style={{ background: theme.bg.secondary, color: theme.text.secondary }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Nome do Cartão</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ background: theme.bg.secondary, color: theme.text.primary, borderColor: theme.border }}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Limite (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              style={{ background: theme.bg.secondary, color: theme.text.primary, borderColor: theme.border }}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Titular (opcional)</label>
            <input
              type="text"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
              placeholder="Seu nome"
              style={{ background: theme.bg.secondary, color: theme.text.primary, borderColor: theme.border }}
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Últimos 4 dígitos (opcional)</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              placeholder="1234"
              maxLength={4}
              style={{ background: theme.bg.secondary, color: theme.text.primary, borderColor: theme.border }}
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Dia do Vencimento</label>
            <input
              type="number"
              min="1"
              max="31"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              placeholder="Ex: 10"
              style={{ background: theme.bg.secondary, color: theme.text.primary, borderColor: theme.border }}
            />
          </div>

          <div className="form-group">
            <label style={{ color: theme.text.primary }}>Cor do Cartão</label>
            <div className="color-grid">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`color-option ${formData.color === color.value ? 'selected' : ''}`}
                  style={{ background: color.hex }}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  aria-label={color.label}
                >
                  {formData.color === color.value && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" style={{ background: theme.purple.primary }}>
            <Check size={20} />
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

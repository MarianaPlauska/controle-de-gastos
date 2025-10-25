import React from 'react';
import { CreditCard, Settings } from 'lucide-react';
import { Card } from '../../types';
import './CardVisual.css';

interface CardVisualProps {
  card: Card;
  onSettingsClick?: () => void;
}

export const CardVisual: React.FC<CardVisualProps> = ({ 
  card, 
  onSettingsClick
}) => {
  const colorMap: Record<string, string> = {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f97316',
    pink: '#ec4899',
    red: '#ef4444',
    yellow: '#eab308',
    teal: '#14b8a6',
  };

  const cardColor = colorMap[card.color] || colorMap.purple;
  


  return (
    <div className="card-visual" style={{ background: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)` }}>
      <div className="card-header">
        <div className="card-brand">
          <CreditCard size={28} />
          <span>{card.name}</span>
        </div>
        {onSettingsClick && (
          <button className="settings-btn" onClick={onSettingsClick} aria-label="Configurações do cartão">
            <Settings size={16} />
          </button>
        )}
      </div>

      <div className="card-number">{card.cardNumber || '**** **** **** ****'}</div>

      <div className="card-details">
        <div className="card-detail">
          <span className="label">Titular</span>
          <span className="value">{card.cardHolder || 'Seu Nome'}</span>
        </div>
        <div className="card-detail">
          <span className="label">Vencimento</span>
          <span className="value">{card.dueDate ? `Dia ${card.dueDate}` : '--'}</span>
        </div>
      </div>
    </div>
  );
};

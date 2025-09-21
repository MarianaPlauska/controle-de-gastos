import React from 'react';
import { CreditCard as CreditCardIcon, Settings } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import { formatCurrency } from '../utils/formatters';
import './CreditCard.css';

const CreditCard = ({ onSettingsClick }) => {
  const { cardData, getTotalSpent, getAvailableLimit, getUsagePercentage } = useCard();

  const cardColors = {
    red: '#dc2626',
    blue: '#2563eb',
    green: '#16a34a',
    purple: '#9333ea',
    orange: '#ea580c',
    pink: '#db2777',
    gray: '#6b7280'
  };

  const getCardColor = () => {
    return cardColors[cardData?.color] || cardColors.red;
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f97316';
    if (percentage >= 50) return '#eab308';
    return '#22c55e';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="credit-card-container">
      <div className="credit-card">
        <div className="card-front" style={{ background: `linear-gradient(135deg, ${getCardColor()}, ${getCardColor()}dd)` }}>
          <div className="card-header">
            <div className="card-brand">
              <CreditCardIcon size={32} />
              <span>{cardData?.name || 'Meu Cartão'}</span>
            </div>
            <button 
              className="card-settings-button"
              onClick={onSettingsClick}
              aria-label="Configurar cartão"
            >
              <Settings size={16} />
            </button>
          </div>
          
          <div className="card-content">
            <div className="card-number">
              {cardData?.cardNumber || '**** **** **** 1234'}
            </div>
            
            <div className="card-details">
              <div className="card-holder">
                <span className="label">Titular</span>
                <span className="value">{cardData?.cardHolder || 'SEU NOME'}</span>
              </div>
              <div className="card-expiry">
                <span className="label">Válido até</span>
                <span className="value">{cardData?.expiryDate || '12/25'}</span>
              </div>
            </div>
          </div>
          
          {/* Chip do cartão */}
          <div className="card-chip"></div>
        </div>
      </div>

      <div className="card-info">
        <div className="limit-info">
          <div className="limit-header">
            <h3>Limite do Cartão</h3>
            <span className="limit-amount">{formatCurrency(cardData?.limit || 500)}</span>
          </div>
          
          <div className="usage-bar">
            <div 
              className="usage-fill"
              style={{ 
                width: `${getUsagePercentage()}%`,
                backgroundColor: getUsageColor(getUsagePercentage())
              }}
            />
          </div>
          
          <div className="usage-details">
            <div className="usage-item">
              <span className="label">Utilizado</span>
              <span className="value spent">{formatCurrency(getTotalSpent())}</span>
            </div>
            <div className="usage-item">
              <span className="label">Disponível</span>
              <span className="value available">{formatCurrency(getAvailableLimit())}</span>
            </div>
          </div>
        </div>

        <div className="recharge-info">
          <span className="label">Próxima recarga</span>
          <span className="value">
            {formatDate(cardData?.nextRecharge)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreditCard; 
import React from 'react';
import { CreditCard as CreditCardIcon, Settings } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import { formatCurrency } from '../utils/formatters';
import './CreditCard.css';

const CreditCard = ({ onSettingsClick }) => {
  const { cardData, getTotalSpent, getAvailableLimit, getUsagePercentage } = useCard();

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f97316';
    if (percentage >= 50) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="credit-card-container">
      <div className="credit-card">
        <div className="card-front">
          <div className="card-header">
            <div className="card-brand">
              <CreditCardIcon size={32} />
              <span>VR Card</span>
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
            {cardData?.nextRecharge 
              ? new Date(cardData.nextRecharge).toLocaleDateString('pt-BR')
              : new Date().toLocaleDateString('pt-BR')
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreditCard; 
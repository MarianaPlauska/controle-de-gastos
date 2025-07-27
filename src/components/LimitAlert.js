import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import './LimitAlert.css';

const LimitAlert = () => {
  const { getUsagePercentage, getAvailableLimit } = useCard();
  const usagePercentage = getUsagePercentage();
  
  if (usagePercentage < 75) return null;

  return (
    <div className="limit-alert">
      <div className="alert-content">
        <AlertTriangle size={20} className="alert-icon" />
        <div className="alert-message">
          <strong>Atenção!</strong> Você já utilizou {Math.round(usagePercentage)}% do seu limite.
          <br />
          Disponível: R${getAvailableLimit().toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default LimitAlert; 
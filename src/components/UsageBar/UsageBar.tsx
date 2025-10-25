import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getUsageColor } from '../../utils/formatters';
import './UsageBar.css';

interface UsageBarProps {
  percentage: number;
  spent: number;
}

export const UsageBar: React.FC<UsageBarProps> = ({ percentage, spent }) => {
  const showWarning = percentage >= 75;
  const color = getUsageColor(percentage);

  return (
    <div className="usage-bar-container">
      {showWarning && (
        <div className="usage-warning">
          <AlertTriangle size={16} />
          <span>
            {percentage >= 90 
              ? 'Atenção! Limite quase esgotado' 
              : 'Você está próximo do limite'}
          </span>
        </div>
      )}
      
      <div className="usage-bar">
        <div 
          className="usage-fill" 
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            background: color
          }}
        />
      </div>
      
      <div className="usage-labels">
        <span>Usado: R$ {spent.toFixed(2)}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

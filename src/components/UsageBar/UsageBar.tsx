import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getUsageColor } from '../../utils/formatters';
import * as S from './styles';

interface UsageBarProps {
  percentage: number;
  spent: number;
}

export const UsageBar: React.FC<UsageBarProps> = ({ percentage, spent }) => {
  const showWarning = percentage >= 75;
  const color = getUsageColor(percentage);

  return (
    <S.Container>
      {showWarning && (
        <S.Warning>
          <AlertTriangle size={16} />
          <span>
            {percentage >= 90
              ? 'Atenção! Limite quase esgotado'
              : 'Você está próximo do limite'}
          </span>
        </S.Warning>
      )}

      <S.Bar>
        <S.Fill
          $width={Math.min(percentage, 100)}
          $color={color}
        />
      </S.Bar>

      <S.Labels>
        <span>Usado: R$ {spent.toFixed(2)}</span>
        <span>{percentage.toFixed(0)}%</span>
      </S.Labels>
    </S.Container>
  );
};

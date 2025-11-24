import React from 'react';
import { Wifi } from 'lucide-react';
import { Card } from '../../types';
import * as S from './styles';

interface CardVisualProps {
  card: Card;
  onSettingsClick?: () => void;
}

export const CardVisual: React.FC<CardVisualProps> = ({
  card,
  onSettingsClick
}) => {
  const colorMap: Record<string, string> = {
    purple: '#6366f1',
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
    <S.CardContainer $color={cardColor} onClick={onSettingsClick}>
      <S.CardHeader>
        <S.Chip />
        <Wifi size={24} style={{ transform: 'rotate(90deg)' }} />
      </S.CardHeader>

      <S.CardNumber>
        {card.cardNumber ?
          `•••• •••• •••• ${card.cardNumber}` :
          '•••• •••• •••• ••••'
        }
      </S.CardNumber>

      <S.CardFooter>
        <S.CardInfo>
          <S.Label>Titular</S.Label>
          <S.Value>{card.cardHolder || 'SEU NOME'}</S.Value>
        </S.CardInfo>
        <S.CardBrand>
          <S.BrandName>{card.name}</S.BrandName>
        </S.CardBrand>
      </S.CardFooter>
    </S.CardContainer>
  );
};

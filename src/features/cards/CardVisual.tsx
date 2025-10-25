import React from 'react';
import styled from 'styled-components';
import { CreditCard, Settings } from 'lucide-react';
import { Card as CardType } from '../../types';

const CardContainer = styled.div`
  perspective: 1000px;
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CardFront = styled.div<{ color: string }>`
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
  border-radius: 24px;
  padding: 2rem;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(60px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    filter: blur(40px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const CardBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
`;

const SettingsButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CardNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  font-family: 'Courier New', monospace;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const CardChip = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 50px;
  height: 40px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 30px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

const CardLogo = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  font-weight: 800;
  opacity: 0.3;
  z-index: 1;
  font-style: italic;
`;


interface CardVisualProps {
  card: CardType;
  onSettingsClick?: () => void;
}

export const CardVisual: React.FC<CardVisualProps> = ({ card, onSettingsClick }) => {
  const cardColors: Record<string, string> = {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f97316',
    pink: '#ec4899',
    red: '#ef4444',
    yellow: '#eab308',
    teal: '#14b8a6',
  };

  const cardColor = cardColors[card.color] || cardColors.purple;

  return (
    <CardContainer>
      <CardFront color={cardColor}>
        <CardHeader>
          <CardBrand>
            <CreditCard size={28} />
            <span>{card.name}</span>
          </CardBrand>
          {onSettingsClick && (
            <SettingsButton onClick={onSettingsClick}>
              <Settings size={16} />
            </SettingsButton>
          )}
        </CardHeader>

        <CardNumber>{card.cardNumber || '**** **** **** 1234'}</CardNumber>

        <CardDetails>
          <CardDetail>
            <Label>Titular</Label>
            <Value>{card.cardHolder || 'SEU NOME'}</Value>
          </CardDetail>
          <CardDetail>
            <Label>Válido até</Label>
            <Value>{card.expiryDate || '12/25'}</Value>
          </CardDetail>
        </CardDetails>

        <CardChip />
        <CardLogo>VISA</CardLogo>
      </CardFront>
    </CardContainer>
  );
};

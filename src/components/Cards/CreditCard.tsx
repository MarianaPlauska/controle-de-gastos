import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardContainer,
  CardTop,
  Chip,
  CardLogo,
  CardNumber,
  CardBottom,
  CardInfo
} from './CreditCard.styles';

interface CreditCardProps {
  id?: string;
  name: string;
  nickname?: string;
  lastDigits: string;
  limit: string;
  color?: string;
  brand?: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  id,
  name,
  nickname,
  lastDigits,
  limit,
  color = 'linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%)',
  brand = 'VISA'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/cards/${id}`);
    }
  };

  return (
    <CardContainer color={color} onClick={handleClick} style={{ cursor: id ? 'pointer' : 'default' }}>
      <CardTop>
        <Chip />
        <CardLogo>{brand}</CardLogo>
      </CardTop>
      <CardNumber>•••• •••• •••• {lastDigits}</CardNumber>
      <CardBottom>
        <CardInfo>
          <span>{nickname ? 'Apelido' : 'Titular'}</span>
          <strong>{nickname || name}</strong>
        </CardInfo>
        <CardInfo>
          <span>Limite</span>
          <strong>{limit}</strong>
        </CardInfo>
      </CardBottom>
    </CardContainer>
  );
};

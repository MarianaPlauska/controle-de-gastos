import React from 'react';
import { Utensils } from 'lucide-react';
import {
  VoucherContainer,
  VoucherHeader,
  CompanyName,
  BalanceContainer,
  BalanceLabel,
  BalanceValue,
  VoucherFooter,
  DailyInfo
} from './MealVoucherCard.styles';

interface MealVoucherProps {
  company: string;
  balance: string;
  dailyAllowance: string;
  color?: string;
}

export const MealVoucherCard: React.FC<MealVoucherProps> = ({
  company,
  balance,
  dailyAllowance,
  color = 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)'
}) => {
  return (
    <VoucherContainer color={color}>
      <VoucherHeader>
        <Utensils size={24} />
        <CompanyName>{company}</CompanyName>
      </VoucherHeader>

      <BalanceContainer>
        <BalanceLabel>Saldo Atual</BalanceLabel>
        <BalanceValue>{balance}</BalanceValue>
      </BalanceContainer>

      <VoucherFooter>
        <DailyInfo>
          <span>Diária</span>
          <strong>{dailyAllowance}</strong>
        </DailyInfo>
        <DailyInfo style={{ alignItems: 'flex-end' }}>
          <span>Próxima Recarga</span>
          <strong>05/12</strong>
        </DailyInfo>
      </VoucherFooter>
    </VoucherContainer>
  );
};

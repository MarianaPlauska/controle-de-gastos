import React from 'react';
import { ShoppingBag, Coffee, Car, Home, DollarSign } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import {
  ListContainer,
  Header,
  Title,
  ExpenseItem,
  IconWrapper,
  Info,
  Amount
} from './ExpenseList.styles';

export const ExpenseList: React.FC = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Filter only expenses and take the last 5
  const recentExpenses = transactions
    .filter(t => t.type === 'expense')
    .slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'alimentação': return <Coffee size={20} />;
      case 'transporte': return <Car size={20} />;
      case 'moradia': return <Home size={20} />;
      case 'compras': return <ShoppingBag size={20} />;
      default: return <DollarSign size={20} />;
    }
  };

  const getColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'alimentação': return '#ff9966';
      case 'transporte': return '#28a745';
      case 'moradia': return '#6f42c1';
      case 'compras': return '#0066cc';
      default: return '#666';
    }
  };

  return (
    <ListContainer>
      <Header>
        <Title>Últimos Gastos</Title>
      </Header>
      {recentExpenses.length > 0 ? (
        recentExpenses.map((expense) => (
          <ExpenseItem key={expense.id}>
            <IconWrapper color={getColor(expense.category)}>
              {getIcon(expense.category)}
            </IconWrapper>
            <Info>
              <h4>{expense.title}</h4>
              <span>{formatDate(expense.date)}</span>
            </Info>
            <Amount>- {formatCurrency(expense.amount)}</Amount>
          </ExpenseItem>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
          Nenhum gasto registrado.
        </div>
      )}
    </ListContainer>
  );
};

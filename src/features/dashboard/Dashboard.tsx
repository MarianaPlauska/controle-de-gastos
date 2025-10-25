import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';
import { useCards } from '../cards/useCards';
import { CardVisual } from '../cards/CardVisual';


const Container = styled.div`
  min-height: 100vh;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
`;

const Header = styled.header`
  padding: 2rem 1.5rem;
  color: white;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    width: 32px;
    height: 32px;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Greeting = styled.div`
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.9;
  }
`;

const BalanceCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  margin: 0 1.5rem 2rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BalanceLabel = styled.span`
  font-size: 0.875rem;
  opacity: 0.9;
  font-weight: 500;
`;

const BalanceAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BalanceActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 1rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: white;
    color: #8b5cf6;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}
  
  &:active {
    transform: scale(0.98);
  }
`;

const Content = styled.div`
  background: #fafafa;
  border-radius: 32px 32px 0 0;
  min-height: calc(100vh - 400px);
  padding: 2rem 1.5rem;
  padding-bottom: 100px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #18181b;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #71717a;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #18181b;
`;

const CardSection = styled.div`
  margin-bottom: 2rem;
`;

const TransactionsSection = styled.div`
  margin-bottom: 2rem;
`;

const TransactionItem = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TransactionIcon = styled.div<{ type: 'income' | 'expense' }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.type === 'income' ? '#ecfdf5' : '#fef2f2'};
  color: ${props => props.type === 'income' ? '#10b981' : '#ef4444'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #18181b;
  margin-bottom: 0.25rem;
`;

const TransactionDate = styled.div`
  font-size: 0.875rem;
  color: #71717a;
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${props => props.type === 'income' ? '#10b981' : '#ef4444'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #71717a;
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.3;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

// ============================================
// COMPONENTE
// ============================================

export const Dashboard: React.FC = () => {
  const { activeCard, getCardStats } = useCards();
  const stats = getCardStats();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Logo>
            <Wallet />
            <span>FinControl</span>
          </Logo>
          <IconButton>
            <Calendar size={20} />
          </IconButton>
        </HeaderTop>
        
        <Greeting>
          <h1>{getGreeting()}!</h1>
          <p>Gerencie suas finanças com inteligência</p>
        </Greeting>
      </Header>

      <BalanceCard>
        <BalanceHeader>
          <BalanceLabel>Saldo disponível</BalanceLabel>
          <IconButton onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </IconButton>
        </BalanceHeader>
        
        <BalanceAmount>
          {showBalance ? formatCurrency(stats.availableLimit) : '••••••'}
        </BalanceAmount>
        
        <BalanceActions>
          <ActionButton variant="primary">
            <Plus size={18} />
            Adicionar
          </ActionButton>
          <ActionButton variant="secondary">
            <TrendingUp size={18} />
            Relatório
          </ActionButton>
        </BalanceActions>
      </BalanceCard>

      <Content>
        <SectionTitle>Resumo</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatIcon color="linear-gradient(135deg, #10b981, #059669)">
              <ArrowUpRight size={20} />
            </StatIcon>
            <StatLabel>Limite Total</StatLabel>
            <StatValue>{formatCurrency(activeCard.limit)}</StatValue>
          </StatCard>
          
          <StatCard>
            <StatIcon color="linear-gradient(135deg, #ef4444, #dc2626)">
              <ArrowDownRight size={20} />
            </StatIcon>
            <StatLabel>Gasto Total</StatLabel>
            <StatValue>{formatCurrency(stats.totalSpent)}</StatValue>
          </StatCard>
          
          <StatCard>
            <StatIcon color="linear-gradient(135deg, #8b5cf6, #7c3aed)">
              <CreditCard size={20} />
            </StatIcon>
            <StatLabel>Transações</StatLabel>
            <StatValue>{stats.transactionCount}</StatValue>
          </StatCard>
          
          <StatCard>
            <StatIcon color="linear-gradient(135deg, #f97316, #ea580c)">
              <DollarSign size={20} />
            </StatIcon>
            <StatLabel>Uso do Limite</StatLabel>
            <StatValue>{stats.usagePercentage.toFixed(0)}%</StatValue>
          </StatCard>
        </StatsGrid>

        <CardSection>
          <SectionTitle>Seu Cartão</SectionTitle>
          <CardVisual card={activeCard} />
        </CardSection>

        <TransactionsSection>
          <SectionTitle>Últimas Transações</SectionTitle>
          {stats.transactionCount === 0 ? (
            <EmptyState>
              <DollarSign />
              <p>Nenhuma transação ainda</p>
              <ActionButton variant="primary">
                <Plus size={18} />
                Adicionar primeira transação
              </ActionButton>
            </EmptyState>
          ) : (
            <>
              <TransactionItem>
                <TransactionIcon type="expense">
                  <ArrowDownRight size={20} />
                </TransactionIcon>
                <TransactionInfo>
                  <TransactionTitle>Almoço</TransactionTitle>
                  <TransactionDate>Hoje, 12:30</TransactionDate>
                </TransactionInfo>
                <TransactionAmount type="expense">
                  - R$ 45,00
                </TransactionAmount>
              </TransactionItem>
            </>
          )}
        </TransactionsSection>
      </Content>
    </Container>
  );
};

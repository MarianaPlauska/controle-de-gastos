import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ShoppingBag, Coffee, Car, Home, DollarSign } from 'lucide-react';
import { useCardStore } from '../../store/useCardStore';
import { useTransactionStore } from '../../store/useTransactionStore';
import { CreditCard } from '../../components/Cards/CreditCard';
import { CardColorPicker } from '../../components/Cards/CardColorPicker';
import { Modal } from '../../components/UI/Modal';
import { CardExpenseForm } from '../../components/Cards/CardExpenseForm';
import {
    PageContainer,
    Header,
    CardSection,
    StatsSection,
    StatGrid,
    StatCard,
    ProgressBarContainer,
    ProgressLabel,
    ProgressBar,
    ProgressFill,
    TransactionsSection,
    ActionButton,
    BackButton
} from './CardDetails.styles';
import styled from 'styled-components';

// Reuse styles from ExpenseList for consistency, but locally defined for now to avoid circular deps or complex refactors
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExpenseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color }) => color}20;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Amount = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`;

export const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { cards, updateCard } = useCardStore();
    const { transactions } = useTransactionStore();

    const card = cards.find(c => c.id === id);
    const [isEditingColor, setIsEditingColor] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const cardTransactions = useMemo(() => {
        return transactions
            .filter(t => t.cardId === id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, id]);

    const currentSpending = useMemo(() => {
        return cardTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [cardTransactions]);

    if (!card) {
        return <div>Cartão não encontrado</div>;
    }

    const availableLimit = card.limit - currentSpending;
    const spendingPercentage = Math.min((currentSpending / card.limit) * 100, 100);

    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return '#dc3545'; // Critical (Red)
        if (percentage >= 70) return '#ffc107'; // Warning (Yellow)
        return '#28a745'; // Good (Green)
    };

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
        <PageContainer>
            <BackButton onClick={() => navigate('/cards')}>
                <ArrowLeft size={20} />
                Voltar para Carteira
            </BackButton>

            <Header>
                <CardSection>
                    <CreditCard
                        name={card.name}
                        nickname={card.nickname}
                        lastDigits={card.lastDigits}
                        limit={formatCurrency(card.limit)}
                        brand={card.brand}
                        color={card.color}
                    />
                    <ActionButton onClick={() => setIsEditingColor(true)}>
                        Alterar Cor
                    </ActionButton>
                    {isEditingColor && (
                        <CardColorPicker
                            selectedColor={card.color}
                            onSelectColor={(color) => {
                                updateCard(card.id, { color });
                                setIsEditingColor(false);
                            }}
                        />
                    )}
                </CardSection>

                <StatsSection>
                    <StatGrid>
                        <StatCard>
                            <h3>Limite Total</h3>
                            <p>{formatCurrency(card.limit)}</p>
                        </StatCard>
                        <StatCard>
                            <h3>Gasto Atual</h3>
                            <p style={{ color: '#dc3545' }}>{formatCurrency(currentSpending)}</p>
                        </StatCard>
                        <StatCard>
                            <h3>Disponível</h3>
                            <p style={{ color: '#28a745' }}>{formatCurrency(availableLimit)}</p>
                        </StatCard>
                    </StatGrid>

                    <ProgressBarContainer>
                        <ProgressLabel>
                            <span>Consumo do Limite</span>
                            <span>{spendingPercentage.toFixed(1)}%</span>
                        </ProgressLabel>
                        <ProgressBar>
                            <ProgressFill
                                width={spendingPercentage}
                                color={getProgressColor(spendingPercentage)}
                            />
                        </ProgressBar>
                        {spendingPercentage >= 90 && (
                            <span style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                ⚠️ Atenção! Você está próximo do limite.
                            </span>
                        )}
                    </ProgressBarContainer>

                    <ActionButton onClick={() => setIsExpenseModalOpen(true)} style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                        <Plus size={20} />
                        Registrar Gasto neste Cartão
                    </ActionButton>
                </StatsSection>
            </Header>

            <TransactionsSection>
                <h2>Histórico de Gastos</h2>
                <ListContainer>
                    {cardTransactions.length > 0 ? (
                        cardTransactions.map((expense) => (
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
                            Nenhum gasto registrado neste cartão.
                        </div>
                    )}
                </ListContainer>
            </TransactionsSection>

            <Modal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
                <CardExpenseForm cardId={card.id} onClose={() => setIsExpenseModalOpen(false)} />
            </Modal>
        </PageContainer>
    );
};

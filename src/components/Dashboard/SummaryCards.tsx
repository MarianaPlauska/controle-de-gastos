import React, { useMemo } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { CardsContainer, Card, CardHeader, CardTitle, CardAmount, CardIcon } from './SummaryCards.styles';

export const SummaryCards: React.FC = () => {
    const transactions = useTransactionStore((state) => state.transactions);

    const { balance, income, expenses } = useMemo(() => {
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
        return {
            income,
            expenses,
            balance: income - expenses,
        };
    }, [transactions]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <CardsContainer>
            <Card>
                <CardHeader>
                    <CardTitle>Saldo Total</CardTitle>
                    <CardIcon color="#0066cc">
                        <Wallet size={24} />
                    </CardIcon>
                </CardHeader>
                <CardAmount>{formatCurrency(balance)}</CardAmount>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Entradas</CardTitle>
                    <CardIcon color="#28a745">
                        <ArrowUpCircle size={24} />
                    </CardIcon>
                </CardHeader>
                <CardAmount color="#28a745">{formatCurrency(income)}</CardAmount>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Saídas</CardTitle>
                    <CardIcon color="#dc3545">
                        <ArrowDownCircle size={24} />
                    </CardIcon>
                </CardHeader>
                <CardAmount color="#dc3545">{formatCurrency(expenses)}</CardAmount>
            </Card>
        </CardsContainer>
    );
};

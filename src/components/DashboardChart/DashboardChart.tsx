import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import { useCards } from '../../contexts/CardsContext';
import * as S from './styles';

export const DashboardChart: React.FC = () => {
    const { theme } = useTheme();
    const { expenses } = useCards();

    // Group expenses by date
    const data = React.useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => {
            const dayExpenses = expenses.filter(e => e.date === date);
            const total = dayExpenses.reduce((acc, curr) => acc + curr.amount, 0);
            return {
                name: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' }),
                amount: total,
            };
        });
    }, [expenses]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <S.TooltipContainer>
                    <S.TooltipLabel>{label}</S.TooltipLabel>
                    <S.TooltipValue>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(payload[0].value)}
                    </S.TooltipValue>
                </S.TooltipContainer>
            );
        }
        return null;
    };

    return (
        <S.ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.purple.primary} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={theme.purple.primary} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.bg.tertiary} vertical={false} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.text.secondary, fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.text.secondary, fontSize: 12 }}
                        tickFormatter={(value) => `R$ ${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.purple.primary}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </S.ChartContainer>
    );
};

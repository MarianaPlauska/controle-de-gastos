import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCards } from '../../contexts/CardsContext';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatters';
import './Stats.css';

export const Stats: React.FC = () => {
  const { allExpenses, getCardStats } = useCards();
  const { theme } = useTheme();
  const stats = getCardStats();

  const categoryData = allExpenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const monthlyData = allExpenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('pt-BR', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.total += expense.amount;
    } else {
      acc.push({ month, total: expense.amount });
    }
    return acc;
  }, [] as { month: string; total: number }[]);

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="stats-page" style={{ background: theme.bg.primary }}>
      <header className="page-header">
        <h1 style={{ color: theme.text.primary }}>Estatísticas</h1>
      </header>

      <div className="stats-summary">
        <div className="summary-item" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <span style={{ color: theme.text.secondary }}>Total Gasto</span>
          <h2 style={{ color: theme.text.primary }}>{formatCurrency(stats.totalSpent)}</h2>
        </div>
        <div className="summary-item" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <span style={{ color: theme.text.secondary }}>Transações</span>
          <h2 style={{ color: theme.text.primary }}>{stats.transactionCount}</h2>
        </div>
      </div>

      <div className="chart-section" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
        <h3 style={{ color: theme.text.primary }}>Gastos por Categoria</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${formatCurrency(entry.value)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((item, index) => (
                  <Cell key={`cell-${item.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-chart" style={{ color: theme.text.secondary }}>
            Nenhum dado disponível
          </div>
        )}
      </div>

      <div className="chart-section" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
        <h3 style={{ color: theme.text.primary }}>Gastos Mensais</h3>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke={theme.text.secondary} />
              <YAxis stroke={theme.text.secondary} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-chart" style={{ color: theme.text.secondary }}>
            Nenhum dado disponível
          </div>
        )}
      </div>
    </div>
  );
};

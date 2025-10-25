import React, { useMemo } from 'react';
import { Moon, Sun, Plus, TrendingDown, Calendar, Bell } from 'lucide-react';
import { Logo } from '../../components/Logo/Logo';
import { useCards } from '../../contexts/CardsContext';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Home.css';

export const Home: React.FC = () => {
  const { allExpenses, getCardStats, cards } = useCards();
  const { theme, isDark, toggleTheme } = useTheme();

  const recentExpenses = allExpenses.slice(0, 5);
  const totalStats = getCardStats();

  const notifications = useMemo(() => {
    const alerts: Array<{ id: string; title: string; message: string; type: 'danger' | 'warning' }> = [];
    cards.forEach(card => {
      const cardExpenses = allExpenses.filter(e => e.cardId === card.id);
      const spent = cardExpenses.reduce((sum, e) => sum + e.amount, 0);
      const percentage = (spent / card.limit) * 100;
      
      if (percentage >= 90) {
        alerts.push({
          id: `${card.id}-90`,
          title: 'Limite Crítico',
          message: `${card.name} atingiu ${percentage.toFixed(0)}% do limite`,
          type: 'danger' as const,
        });
      } else if (percentage >= 75) {
        alerts.push({
          id: `${card.id}-75`,
          title: 'Alerta de Limite',
          message: `${card.name} atingiu ${percentage.toFixed(0)}% do limite`,
          type: 'warning' as const,
        });
      }
    });
    return alerts;
  }, [cards, allExpenses]);

  return (
    <div className="home-page" style={{ background: theme.bg.primary }}>
      <header className="home-header">
        <Logo size="md" />
        <div className="header-actions">
          <button 
            className="notification-btn"
            style={{ background: theme.bg.secondary, color: theme.text.primary }}
            aria-label="Notificações"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            style={{ background: theme.bg.secondary, color: theme.text.primary }}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <section className="summary-cards">
        <div className="summary-card" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <div className="summary-icon" style={{ background: theme.purple.light }}>
            <TrendingDown size={20} style={{ color: theme.purple.primary }} />
          </div>
          <div className="summary-content">
            <span style={{ color: theme.text.secondary }}>Gastos do Mês</span>
            <h3 style={{ color: theme.text.primary }}>{formatCurrency(totalStats.totalSpent)}</h3>
          </div>
        </div>

        <div className="summary-card" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <div className="summary-icon" style={{ background: theme.purple.light }}>
            <Calendar size={20} style={{ color: theme.purple.primary }} />
          </div>
          <div className="summary-content">
            <span style={{ color: theme.text.secondary }}>Transações</span>
            <h3 style={{ color: theme.text.primary }}>{totalStats.transactionCount}</h3>
          </div>
        </div>
      </section>

      <section className="recent-expenses">
        <div className="section-header">
          <h2 style={{ color: theme.text.primary }}>Gastos Recentes</h2>
          <button className="add-btn" style={{ background: theme.purple.primary }}>
            <Plus size={20} />
          </button>
        </div>

        <div className="expense-list">
          {recentExpenses.length === 0 ? (
            <div className="empty-state" style={{ color: theme.text.secondary }}>
              <p>Nenhum gasto registrado</p>
            </div>
          ) : (
            recentExpenses.map((expense) => (
              <div 
                key={expense.id} 
                className="expense-item"
                style={{ background: theme.bg.card, boxShadow: theme.shadow }}
              >
                <div className="expense-info">
                  <h4 style={{ color: theme.text.primary }}>{expense.description}</h4>
                  <span style={{ color: theme.text.secondary }}>{formatDate(expense.date)}</span>
                </div>
                <div className="expense-amount" style={{ color: '#ef4444' }}>
                  -{formatCurrency(expense.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

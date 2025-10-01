import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useCard } from '../contexts/CardContext';
import ChartsSection from './ChartsSection';
import { 
  CreditCard, 
  Bell, 
  CheckSquare, 
  ShoppingCart,
  Heart,
  Droplets,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = () => {
  const { user } = useUser();
  const { navigateTo } = useNavigation();
  const { cardData, getTotalSpent, getAvailableLimit, expenses } = useCard();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Estatísticas dos gastos
  const totalSpent = getTotalSpent();
  const availableLimit = getAvailableLimit();
  const totalLimit = cardData?.limit || 0;
  const usagePercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  // Gastos dos últimos 7 dias
  const last7Days = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diffTime = Math.abs(today - expenseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  const weeklySpent = last7Days.reduce((total, expense) => total + expense.amount, 0);



  return (
    <div className="home-screen">
      {/* Header com saudação */}
      <div className="home-header">
        <div className="greeting">
          <h1>{getGreeting()}, {user.name || 'Usuário'}! 👋</h1>
          <p>Aqui está um resumo dos seus gastos</p>
        </div>
      </div>

      {/* Estatísticas dos gastos */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>Gasto Total</h3>
              <p className="stat-value">{formatCurrency(totalSpent)}</p>
              <span className="stat-label">de {formatCurrency(totalLimit)}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon available">
              <CreditCard size={24} />
            </div>
            <div className="stat-content">
              <h3>Disponível</h3>
              <p className="stat-value available">{formatCurrency(availableLimit)}</p>
              <span className="stat-label">{usagePercentage.toFixed(1)}% usado</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon weekly">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>Esta Semana</h3>
              <p className="stat-value">{formatCurrency(weeklySpent)}</p>
              <span className="stat-label">{last7Days.length} transações</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos dos gastos */}
      {expenses.length > 0 && (
        <div className="charts-section">
          <h2>Seus Gastos</h2>
          <ChartsSection />
        </div>
      )}

      {/* Ações rápidas */}
      <div className="quick-actions">
        <div className="quick-buttons">
          <button 
            className="quick-btn expenses"
            onClick={() => navigateTo('expenses')}
          >
            <ShoppingCart size={18} />
            <span>Gastos</span>
          </button>
          <button 
            className="quick-btn cards"
            onClick={() => navigateTo('cards')}
          >
            <CreditCard size={18} />
            <span>Cartões</span>
          </button>
          <button 
            className="quick-btn health"
            onClick={() => navigateTo('health')}
          >
            <Heart size={18} />
            <span>Saúde</span>
          </button>
          <button 
            className="quick-btn todos"
            onClick={() => navigateTo('todos')}
          >
            <CheckSquare size={18} />
            <span>Anotações</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
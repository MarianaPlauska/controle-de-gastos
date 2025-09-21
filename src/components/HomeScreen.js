import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../contexts/NavigationContext';
import { 
  CreditCard, 
  Bell, 
  CheckSquare, 
  FileText, 
  ShoppingCart,
  PiggyBank,
  Calendar,
  Target,
  Heart,
  Droplets,
  Dumbbell,
  Settings
} from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = () => {
  const { user } = useUser();
  const { navigateTo } = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const menuItems = [
    {
      id: 'expenses',
      title: 'Gastos',
      description: 'Controle seus gastos por categoria',
      icon: ShoppingCart,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
    },
    {
      id: 'cards',
      title: 'Cartões',
      description: 'Gerencie seus cartões de crédito',
      icon: CreditCard,
      color: '#2563eb',
      gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
    },
    {
      id: 'health',
      title: 'Saúde',
      description: 'Água, exercícios e alimentação',
      icon: Heart,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    },
    {
      id: 'reminders',
      title: 'Lembretes',
      description: 'Não esqueça dos pagamentos',
      icon: Bell,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      id: 'todos',
      title: 'Tarefas',
      description: 'Organize suas atividades',
      icon: CheckSquare,
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e, #16a34a)'
    },
    {
      id: 'notes',
      title: 'Anotações',
      description: 'Suas notas e observações',
      icon: FileText,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    }
  ];

  return (
    <div className="home-screen">
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>
            {getGreeting()}, {user.name || 'Usuário'}! 👋
          </h1>
          <p>O que vamos organizar hoje?</p>
        </div>
        <div className="welcome-stats">
          <div className="stat-card">
            <PiggyBank size={24} />
            <div>
              <span className="stat-label">Controle</span>
              <span className="stat-value">Financeiro</span>
            </div>
          </div>
          <div className="stat-card">
            <Target size={24} />
            <div>
              <span className="stat-label">Organização</span>
              <span className="stat-value">Pessoal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-grid">
        {menuItems.map(item => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="menu-item"
              onClick={() => navigateTo(item.id)}
              style={{ background: item.gradient }}
            >
              <div className="menu-icon">
                <IconComponent size={32} />
              </div>
              <div className="menu-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="menu-arrow">→</div>
            </div>
          );
        })}
      </div>

      <div className="quick-actions">
        <h3>Ações Rápidas</h3>
        <div className="quick-buttons">
          <button 
            className="quick-btn expenses"
            onClick={() => navigateTo('expenses')}
          >
            <ShoppingCart size={20} />
            Adicionar Gasto
          </button>
          <button 
            className="quick-btn health"
            onClick={() => navigateTo('health')}
          >
            <Droplets size={20} />
            Beber Água
          </button>
          <button 
            className="quick-btn reminders"
            onClick={() => navigateTo('reminders')}
          >
            <Calendar size={20} />
            Novo Lembrete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
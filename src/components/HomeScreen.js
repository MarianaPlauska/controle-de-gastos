import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../contexts/NavigationContext';
import { 
  CreditCard, 
  Bell, 
  CheckSquare, 
  FileText, 
  ShoppingCart,
  Calendar,
  Heart,
  Droplets,
  Dumbbell,
  Settings,
  Plus,
  Edit3
} from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = () => {
  const { user, updateUser } = useUser();
  const { navigateTo } = useNavigation();
  const [showShortcutEditor, setShowShortcutEditor] = useState(false);

  // Atalhos salvos do usuário (padrão: gastos e saúde)
  const [userShortcuts, setUserShortcuts] = useState(() => {
    const saved = localStorage.getItem('userShortcuts');
    return saved ? JSON.parse(saved) : ['expenses', 'health'];
  });

  const saveShortcuts = (shortcuts) => {
    setUserShortcuts(shortcuts);
    localStorage.setItem('userShortcuts', JSON.stringify(shortcuts));
  };

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

  const availableShortcuts = menuItems.filter(item => 
    userShortcuts.includes(item.id)
  );

  const toggleShortcut = (itemId) => {
    const newShortcuts = userShortcuts.includes(itemId)
      ? userShortcuts.filter(id => id !== itemId)
      : [...userShortcuts, itemId];
    saveShortcuts(newShortcuts);
  };

  return (
    <div className="home-screen">
      {/* Header compacto */}
      <div className="home-header">
        <div className="greeting">
          <h1>{getGreeting()}, {user.name || 'Usuário'}! 👋</h1>
          <p>O que vamos fazer hoje?</p>
        </div>
      </div>

      {/* Atalhos personalizáveis */}
      <div className="shortcuts-section">
        <div className="shortcuts-header">
          <h2>Seus Atalhos</h2>
          <button 
            className="edit-shortcuts-btn"
            onClick={() => setShowShortcutEditor(!showShortcutEditor)}
          >
            <Edit3 size={16} />
          </button>
        </div>

        {showShortcutEditor && (
          <div className="shortcut-editor">
            <p>Escolha quais atalhos aparecem na tela inicial:</p>
            <div className="shortcut-options">
              {menuItems.map(item => {
                const IconComponent = item.icon;
                const isSelected = userShortcuts.includes(item.id);
                return (
                  <button
                    key={item.id}
                    className={`shortcut-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleShortcut(item.id)}
                  >
                    <IconComponent size={20} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="shortcuts-grid">
          {availableShortcuts.map(item => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="shortcut-card"
                onClick={() => navigateTo(item.id)}
              >
                <div 
                  className="shortcut-icon"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent size={24} />
                </div>
                <div className="shortcut-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
          
          {availableShortcuts.length === 0 && (
            <div className="no-shortcuts">
              <Plus size={32} />
              <p>Adicione seus atalhos favoritos</p>
              <button onClick={() => setShowShortcutEditor(true)}>
                Personalizar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ações rápidas sempre visíveis */}
      <div className="quick-actions">
        <div className="quick-buttons">
          <button 
            className="quick-btn expenses"
            onClick={() => navigateTo('expenses')}
          >
            <ShoppingCart size={18} />
            <span>Gasto</span>
          </button>
          <button 
            className="quick-btn health"
            onClick={() => navigateTo('health')}
          >
            <Droplets size={18} />
            <span>Água</span>
          </button>
          <button 
            className="quick-btn reminders"
            onClick={() => navigateTo('reminders')}
          >
            <Bell size={18} />
            <span>Lembrete</span>
          </button>
          <button 
            className="quick-btn todos"
            onClick={() => navigateTo('todos')}
          >
            <CheckSquare size={18} />
            <span>Tarefa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
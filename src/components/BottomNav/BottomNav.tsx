import React from 'react';
import { Home, CreditCard, BarChart3, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './BottomNav.css';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'cards', icon: CreditCard, label: 'Cartões' },
    { id: 'stats', icon: BarChart3, label: 'Estatísticas' },
    { id: 'notes', icon: FileText, label: 'Anotações' },
  ];

  return (
    <nav className="bottom-nav" style={{ background: theme.bg.secondary, borderColor: theme.border }}>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`nav-button ${activeTab === id ? 'active' : ''}`}
          style={{
            background: activeTab === id ? theme.purple.light : 'transparent',
            color: activeTab === id ? theme.purple.primary : theme.text.tertiary,
          }}
          onClick={() => onTabChange(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

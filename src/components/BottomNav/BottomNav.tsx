import React from 'react';
import { Home, CreditCard, BarChart3, FileText } from 'lucide-react';
import * as S from './styles';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'cards', icon: CreditCard, label: 'Cartões' },
    { id: 'stats', icon: BarChart3, label: 'Estatísticas' },
    { id: 'notes', icon: FileText, label: 'Anotações' },
  ];

  return (
    <S.Nav>
      {tabs.map(({ id, icon: Icon, label }) => (
        <S.NavButton
          key={id}
          $active={activeTab === id}
          onClick={() => onTabChange(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </S.NavButton>
      ))}
    </S.Nav>
  );
};

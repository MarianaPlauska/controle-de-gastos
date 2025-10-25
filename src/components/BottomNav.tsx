import React from 'react';
import styled from 'styled-components';
import { Home, CreditCard, TrendingUp, User } from 'lucide-react';

// ============================================
// ESTILOS
// ============================================

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #f4f4f5;
  padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: none;
  background: ${props => props.active ? '#f5f3ff' : 'transparent'};
  color: ${props => props.active ? '#8b5cf6' : '#71717a'};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  min-width: 70px;
  
  &:hover {
    background: #fafafa;
    color: #8b5cf6;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ============================================
// COMPONENTE
// ============================================

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <Nav>
      <NavItem active={activeTab === 'home'} onClick={() => onTabChange('home')}>
        <NavIcon>
          <Home size={20} />
        </NavIcon>
        <span>Início</span>
      </NavItem>

      <NavItem active={activeTab === 'cards'} onClick={() => onTabChange('cards')}>
        <NavIcon>
          <CreditCard size={20} />
        </NavIcon>
        <span>Cartões</span>
      </NavItem>

      <NavItem active={activeTab === 'stats'} onClick={() => onTabChange('stats')}>
        <NavIcon>
          <TrendingUp size={20} />
        </NavIcon>
        <span>Estatísticas</span>
      </NavItem>

      <NavItem active={activeTab === 'profile'} onClick={() => onTabChange('profile')}>
        <NavIcon>
          <User size={20} />
        </NavIcon>
        <span>Perfil</span>
      </NavItem>
    </Nav>
  );
};

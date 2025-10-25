import React from 'react';
import styled from 'styled-components';
import { Home, CreditCard, TrendingDown, Moon, Sun } from 'lucide-react';
import { ViewType } from '../types';


const SidebarContainer = styled.nav<{ $isDark: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.$isDark ? '#18181b' : '#ffffff'};
  border-top: 1px solid ${props => props.$isDark ? '#3f3f46' : '#e4e4e7'};
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    width: 280px;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 1rem;
    border-top: none;
    border-right: 1px solid ${props => props.$isDark ? '#3f3f46' : '#e4e4e7'};
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.05);
  }
`;

const Logo = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
    
    svg {
      width: 32px;
      height: 32px;
      color: #9333ea;
    }
    
    span {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #9333ea, #7e22ce);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const NavItems = styled.div`
  display: contents;
  
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    flex: 1;
  }
`;

const NavItem = styled.button<{ $active: boolean; $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(147, 51, 234, 0.2)' 
      : 'rgba(147, 51, 234, 0.1)'
    : 'transparent'
  };
  color: ${props => props.$active 
    ? '#9333ea' 
    : props.$isDark 
      ? '#a1a1aa' 
      : '#71717a'
  };
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.75rem;
  font-weight: 600;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(147, 51, 234, 0.15)' 
      : 'rgba(147, 51, 234, 0.08)'
    };
    color: #9333ea;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ThemeToggle = styled.button<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.$isDark 
    ? 'rgba(147, 51, 234, 0.2)' 
    : 'rgba(147, 51, 234, 0.1)'
  };
  color: #9333ea;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(147, 51, 234, 0.3)' 
      : 'rgba(147, 51, 234, 0.15)'
    };
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem 1.25rem;
    gap: 0.75rem;
    margin-top: auto;
  }
`;

const ThemeLabel = styled.span`
  display: none;
  
  @media (min-width: 768px) {
    display: inline;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  isDark,
  onToggleTheme,
}) => {
  const navItems = [
    { id: 'dashboard' as ViewType, icon: Home, label: 'Início' },
    { id: 'cards' as ViewType, icon: CreditCard, label: 'Cartões' },
    { id: 'expenses' as ViewType, icon: TrendingDown, label: 'Gastos' },
  ];

  return (
    <SidebarContainer $isDark={isDark}>
      <Logo>
        <CreditCard />
        <span>FinControl</span>
      </Logo>
      
      <NavItems>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            $active={currentView === item.id}
            $isDark={isDark}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon />
            <span>{item.label}</span>
          </NavItem>
        ))}
      </NavItems>
      
      <ThemeToggle $isDark={isDark} onClick={onToggleTheme}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        <ThemeLabel>{isDark ? 'Modo Claro' : 'Modo Escuro'}</ThemeLabel>
      </ThemeToggle>
    </SidebarContainer>
  );
};

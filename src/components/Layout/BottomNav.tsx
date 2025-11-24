import React from 'react';
import { Home, CreditCard, PieChart, FileText } from 'lucide-react';
import { NavContainer, NavItem } from './BottomNav.styles';

export const BottomNav: React.FC = () => {
  return (
    <NavContainer>
      <NavItem to="/" end>
        <Home size={24} />
        <span>Início</span>
      </NavItem>
      <NavItem to="/cards">
        <CreditCard size={24} />
        <span>Carteira</span>
      </NavItem>
      <NavItem to="/expenses">
        <PieChart size={24} />
        <span>Gastos</span>
      </NavItem>
      <NavItem to="/notes">
        <FileText size={24} />
        <span>Notas</span>
      </NavItem>
    </NavContainer>
  );
};

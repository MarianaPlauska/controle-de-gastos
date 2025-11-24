import React from 'react';
import { ThemeToggle } from '../UI/ThemeToggle';
import { HeaderContainer, Logo } from './MobileHeader.styles';

export const MobileHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>FinControl</Logo>
      <div style={{ transform: 'scale(0.9)' }}>
        <ThemeToggle />
      </div>
    </HeaderContainer>
  );
};

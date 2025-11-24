import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { ToggleContainer } from './ThemeToggle.styles';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </ToggleContainer>
  );
};

import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <h1>Controle de Gastos</h1>
        <div className="header-actions">
          <button 
            className="icon-button settings-button"
            onClick={onSettingsClick}
            aria-label="Configurações"
          >
            <Settings size={20} />
          </button>
          <button 
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../contexts/NavigationContext';
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();

  return (
    <header className="header">
      <div className="header-container">
        <h1>Meu Controle</h1>
        <div className="header-actions">
          <button 
            className="icon-button settings-button"
            onClick={() => navigateTo('settings')}
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
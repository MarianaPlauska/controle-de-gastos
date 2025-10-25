import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Home } from './pages/Home/Home';
import { Cards } from './pages/Cards/Cards';
import { Stats } from './pages/Stats/Stats';
import { Notes } from './pages/Notes/Notes';
import { BottomNav } from './components/BottomNav/BottomNav';
import { GlobalStyles } from './styles/GlobalStyles';
import { useTheme } from './hooks/useTheme';
import { CardsProvider } from './contexts/CardsContext';
import './styles/variables.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { theme } = useTheme();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'cards':
        return <Cards />;
      case 'stats':
        return <Stats />;
      case 'notes':
        return <Notes />;
      default:
        return <Home />;
    }
  };

  return (
    <CardsProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div style={{ minHeight: '100vh', background: theme.bg.primary }}>
          {renderPage()}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </ThemeProvider>
    </CardsProvider>
  );
};

export default App;

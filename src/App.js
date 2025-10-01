import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CardProvider } from './contexts/CardContext';
import { UserProvider } from './contexts/UserContext';
import { HealthProvider } from './contexts/HealthContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import ExpensesScreen from './components/ExpensesScreen';
import HealthScreen from './components/HealthScreen';
import CardSelector from './components/CardSelector';
import CreditCard from './components/CreditCard';
import ExpenseForm from './components/ExpenseForm';
import ChartsSection from './components/ChartsSection';
import LimitAlert from './components/LimitAlert';
import CardSettings from './components/CardSettings';
import Reminders from './components/Reminders';
import TodoList from './components/TodoList';
import NotesScreen from './components/NotesScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

const AppContent = () => {
  const { currentView } = useNavigation();
  const [showSettings, setShowSettings] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen />;
      case 'expenses':
        return <ExpensesScreen />;
      case 'health':
        return <HealthScreen />;
      case 'cards':
        return (
          <div className="cards-view">
            <LimitAlert />
            
            {/* Informações do cartão no topo */}
            <div className="card-info-section">
              <CreditCard onSettingsClick={() => setShowSettings(true)} />
            </div>
            
            {/* Formulário de gastos logo abaixo */}
            <div className="card-expense-form">
              <ExpenseForm />
            </div>
            
            {/* Seletor de cartões */}
            <CardSelector />
            
            {/* Gráficos na parte inferior */}
            <div className="card-charts">
              <ChartsSection />
            </div>
          </div>
        );
      case 'reminders':
        return (
          <div className="reminders-view">
            <div className="screen-header">
              <h1>Lembretes</h1>
              <p>Não esqueça dos seus compromissos</p>
            </div>
            <Reminders />
          </div>
        );
      case 'todos':
        return (
          <div className="todos-view">
            <div className="screen-header">
              <h1>Minhas Anotações</h1>
              <p>Organize suas ideias e lembretes</p>
            </div>
            <TodoList />
          </div>
        );
      case 'notes':
        return <NotesScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="App">
      <Header onSettingsClick={() => setShowSettings(true)} />
      
      <main className="main-content">
        {renderCurrentView()}
      </main>

      <BottomNavigation />

      {showSettings && (
        <CardSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

function App() {
  // Registrar service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <HealthProvider>
          <NavigationProvider>
            <CardProvider>
              <AppContent />
            </CardProvider>
          </NavigationProvider>
        </HealthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App; 
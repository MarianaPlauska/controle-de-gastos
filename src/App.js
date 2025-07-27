import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CardProvider } from './contexts/CardContext';
import Header from './components/Header';
import CreditCard from './components/CreditCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ChartsSection from './components/ChartsSection';
import LimitAlert from './components/LimitAlert';
import CardSettings from './components/CardSettings';
import './App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <ThemeProvider>
      <CardProvider>
        <div className="App">
          <Header onSettingsClick={() => setShowSettings(true)} />
          
          <main className="main-content">
            <LimitAlert />
            
            <div className="card-section">
              <CreditCard onSettingsClick={() => setShowSettings(true)} />
              <ExpenseForm />
            </div>

            <ChartsSection />
            <ExpenseList />
          </main>

          {showSettings && (
            <CardSettings onClose={() => setShowSettings(false)} />
          )}
        </div>
      </CardProvider>
    </ThemeProvider>
  );
}

export default App; 
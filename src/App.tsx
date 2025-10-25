import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './features/dashboard/Dashboard';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;

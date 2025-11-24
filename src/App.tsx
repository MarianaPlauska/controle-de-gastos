import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Cards } from './pages/Cards/Cards';
import { CardDetails } from './pages/CardDetails/CardDetails';
import { Expenses } from './pages/Expenses/Expenses';
import { Notes } from './pages/Notes/Notes';
import { ThemeProvider } from './contexts/ThemeContext';
import GlobalStyle from './styles/global';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cards" element={<Cards />} />
            <Route path="cards/:id" element={<CardDetails />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="notes" element={<Notes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

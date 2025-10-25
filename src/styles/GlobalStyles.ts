import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #18181b;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Scrollbar moderna */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Seleção de texto */
  ::selection {
    background: rgba(139, 92, 246, 0.3);
    color: #18181b;
  }

  /* Foco acessível */
  *:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }

  /* Desabilitar tap highlight */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* Botões e inputs */
  button, input, textarea, select {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Imagens */
  img {
    max-width: 100%;
    height: auto;
  }
`;

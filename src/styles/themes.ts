export const lightTheme = {
  bg: {
    primary: '#f8f9fa',
    secondary: '#ffffff',
    tertiary: '#f1f3f5',
    card: '#ffffff',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#6c757d',
    tertiary: '#adb5bd',
  },
  purple: {
    primary: '#7c3aed',
    secondary: '#9333ea',
    light: '#e9d5ff',
    dark: '#5b21b6',
  },
  border: '#e9ecef',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
};

export const darkTheme = {
  bg: {
    primary: '#0f0f1e',
    secondary: '#1a1a2e',
    tertiary: '#16213e',
    card: '#1e1e2e',
  },
  text: {
    primary: '#f8f9fa',
    secondary: '#adb5bd',
    tertiary: '#6c757d',
  },
  purple: {
    primary: '#a78bfa',
    secondary: '#8b5cf6',
    light: '#2e1065',
    dark: '#c4b5fd',
  },
  border: 'rgba(139, 92, 246, 0.2)',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

export type Theme = typeof lightTheme;

import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 80px; /* Space for BottomNav */
  }
`;

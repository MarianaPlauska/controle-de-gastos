import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 1rem;
  
  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ active, theme }) => (active ? 'white' : theme.colors.textSecondary)};
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ active }) => (active ? '0 4px 12px rgba(0, 102, 204, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)')};
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.border)};

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.hover)};
  }
`;

export const ContentArea = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

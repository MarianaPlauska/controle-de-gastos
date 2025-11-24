import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const StatsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};

  h3 {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  p {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => Math.min(width, 100)}%;
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 6px;
  transition: width 0.5s ease, background-color 0.3s ease;
`;

export const TransactionsSection = styled.div`
  margin-top: 2rem;
  
  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }
`;

export const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

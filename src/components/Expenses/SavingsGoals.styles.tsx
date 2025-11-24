import styled from 'styled-components';

export const SavingsContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const GoalItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const GoalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  h4 {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const GoalAmount = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

export const Progress = styled.div<{ width: string; color: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

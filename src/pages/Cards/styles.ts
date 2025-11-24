import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 6rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg.primary};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 700;
`;

export const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.purple.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${({ theme }) => theme.purple.light};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const WalletContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
  margin: 0 -1.5rem 2rem -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MiniCard = styled.div<{ $color: string; $active: boolean }>`
  min-width: 60px;
  height: 40px;
  border-radius: 8px;
  background: ${({ $color }) => $color};
  opacity: ${({ $active }) => $active ? 1 : 0.5};
  transform: ${({ $active }) => $active ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${({ theme, $active }) => $active ? theme.bg.primary : 'transparent'};
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'};
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const UsageSection = styled.div`
  background: ${({ theme }) => theme.bg.card};
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const UsageLabel = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const UsagePercentage = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ProgressBar = styled.div`
  height: 12px;
  background: ${({ theme }) => theme.bg.tertiary};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const ProgressFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: 6px;
  transition: width 0.5s ease;
`;

export const UsageStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatValue = styled.span<{ $color?: string }>`
  color: ${({ theme, $color }) => $color || theme.text.primary};
  font-weight: 700;
  font-size: 1rem;
`;

export const AddExpenseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.purple.primary};
  color: white;
  border-radius: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.purple.light};
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

export const ExpensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExpenseCard = styled.div`
  background: ${({ theme }) => theme.bg.card};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const ExpenseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ExpenseTitle = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
`;

export const ExpenseMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ExpenseAmount = styled.span`
  color: ${({ theme }) => theme.danger.primary};
  font-weight: 600;
`;

export const DeleteButton = styled.button`
  color: ${({ theme }) => theme.text.tertiary};
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.danger.primary};
  }
`;

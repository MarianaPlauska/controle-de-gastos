import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  
  span {
    color: ${({ theme }) => theme.purple.primary};
  }
`;

export const DateText = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const SummaryCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ theme, $highlight }) => $highlight ? theme.purple.primary : theme.bg.secondary};
  padding: 1.5rem;
  border-radius: 1.5rem;
  color: ${({ theme, $highlight }) => $highlight ? 'white' : theme.text.primary};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  ${({ $highlight }) => $highlight && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    }
  `}
`;

export const CardIcon = styled.div<{ $highlight?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ theme, $highlight }) => $highlight ? 'rgba(255, 255, 255, 0.2)' : theme.bg.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${({ theme, $highlight }) => $highlight ? 'white' : theme.purple.primary};
`;

export const CardLabel = styled.span<{ $highlight?: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme, $highlight }) => $highlight ? 'rgba(255, 255, 255, 0.8)' : theme.text.secondary};
  display: block;
  margin-bottom: 0.5rem;
`;

export const CardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const CardTrend = styled.div<{ $positive: boolean; $highlight?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme, $positive, $highlight }) =>
        $highlight ? 'rgba(255, 255, 255, 0.9)' :
            $positive ? theme.success.primary : theme.danger.primary
    };
  font-weight: 500;
`;

export const ChartSection = styled.section`
  background: ${({ theme }) => theme.bg.secondary};
  padding: 2rem;
  border-radius: 1.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.bg.tertiary};
  color: ${({ theme }) => theme.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.bg.input};
  }
`;

export const RecentActivity = styled.div`
  display: grid;
  gap: 1rem;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.bg.secondary};
  border-radius: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }
`;

export const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $color }) => `${$color}20`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ActivityTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const ActivityDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ActivityAmount = styled.span<{ $type: 'income' | 'expense' }>`
  font-weight: 600;
  color: ${({ theme, $type }) => $type === 'income' ? theme.success.primary : theme.danger.primary};
`;

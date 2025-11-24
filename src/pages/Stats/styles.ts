import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 100px;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg.primary};
`;

export const Header = styled.header`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const SummaryItem = styled.div`
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${({ theme }) => theme.bg.card};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const SummaryLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;

export const SummaryValue = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const ChartSection = styled.div`
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.bg.card};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text.primary};
`;

export const EmptyChart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.text.secondary};
`;

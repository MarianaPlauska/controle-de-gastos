import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  flex: 2;
  min-width: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChartHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

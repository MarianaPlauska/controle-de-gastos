import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
`;

export const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.bg.primary};
  border: 1px solid ${({ theme }) => theme.bg.tertiary};
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const TooltipLabel = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const TooltipValue = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1rem;
  font-weight: 600;
`;

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const Container = styled.div`
  margin: 1rem 0;
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.danger.primary};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
`;

export const Bar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.bg.tertiary};
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const Fill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: 0.25rem;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px ${({ $color }) => $color};
`;

export const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
`;

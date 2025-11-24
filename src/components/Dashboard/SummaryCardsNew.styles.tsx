import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, background-color 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const CardIcon = styled.div<{ color?: string }>`
  color: ${({ color, theme }) => color || theme.colors.text};
  background: ${({ color, theme }) => (color ? `${color}15` : theme.colors.hover)};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardAmount = styled.span<{ color?: string }>`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ color, theme }) => color || theme.colors.text};
`;

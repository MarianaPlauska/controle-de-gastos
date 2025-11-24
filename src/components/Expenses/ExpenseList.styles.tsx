import styled from 'styled-components';

export const ListContainer = styled.div`
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

export const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const IconWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => color}20;
  color: ${({ color }) => color};
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  h4 {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.2rem;
  }
  
  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Amount = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`;

import styled from 'styled-components';

export const RemindersContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  flex: 1;
  min-width: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ReminderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ReminderTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const ReminderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReminderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export const ReminderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ReminderAmount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 100px;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg.primary};

  @media (max-width: 480px) {
    padding: 1rem;
    padding-bottom: 90px;
  }
`;

export const Header = styled.header`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 1rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  background: ${({ theme, $active }) => $active ? theme.purple.primary : theme.bg.card};
  color: ${({ theme, $active }) => $active ? 'white' : theme.text.primary};

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 360px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

export const Section = styled.div`
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const TotalIncome = styled.div`
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.bg.card};
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

export const IncomeIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.purple.light};
  color: ${({ theme }) => theme.purple.primary};

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`;

export const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TotalLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 0.25rem;
`;

export const TotalValue = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }

  @media (max-width: 360px) {
    font-size: 1.375rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

export const AddButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: ${({ theme }) => theme.purple.primary};

  &:hover {
    transform: scale(1.05);
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.text.secondary};

  p {
    font-size: 1rem;
    font-weight: 500;
  }

  span {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
  }
`;

export const IncomeItem = styled.div`
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.bg.card};
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const IncomeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const IncomeTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const IncomeType = styled.span`
  font-size: 0.875rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text.secondary};
`;

export const IncomeAmount = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.success.primary};
`;

export const NoteItem = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg.card};
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const NoteTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text.primary};
`;

export const NoteContent = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text.secondary};
`;

export const NoteDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.tertiary};
`;

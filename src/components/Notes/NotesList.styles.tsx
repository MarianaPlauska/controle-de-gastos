import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding-right: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    border-right: none;
    padding-right: 0;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

export const NoteItem = styled.div<{ isActive: boolean }>`
  padding: 1rem;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.hover : theme.colors.surface)};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid ${({ isActive, theme }) => (isActive ? theme.colors.primary : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

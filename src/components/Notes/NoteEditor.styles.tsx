import styled from 'styled-components';

export const EditorContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  min-height: 600px;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TitleInput = styled.input`
  font-size: 2.5rem;
  font-weight: 700;
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  margin-bottom: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BlockWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;
  
  &:hover .delete-btn {
    opacity: 1;
  }
`;

export const DeleteButton = styled.button`
  opacity: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
  position: absolute;
  left: -30px;
  top: 4px;
`;

export const TextBlock = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  font-family: inherit;
  min-height: 24px;
  line-height: 1.5;
  overflow: hidden;
`;

export const CheckboxBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
  
  input[type="text"] {
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    background: transparent;
    
    &.checked {
      text-decoration: line-through;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const AddBlockMenu = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

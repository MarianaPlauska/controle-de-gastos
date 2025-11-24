import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.bg.secondary};
  width: 90%;
  max-width: 500px;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 90vh;
  overflow-y: auto;

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg.tertiary};
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.bg.input};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.bg.input};
  border: 1px solid transparent;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  color: ${({ theme }) => theme.text.primary};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.purple.primary};
    background: ${({ theme }) => theme.bg.card};
  }
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
`;

export const ColorOption = styled.button<{ $color: string; $selected: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ theme, $selected }) => $selected ? theme.text.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.purple.primary};
  color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

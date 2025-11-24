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
  align-items: flex-end;
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
  width: 100%;
  max-width: 500px;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    border-radius: 1.5rem;
    margin-bottom: 2rem;
    animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    align-items: center;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

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
  gap: 1.5rem;
`;

export const AmountInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
`;

export const CurrencyLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
`;

export const AmountInput = styled.input`
  background: transparent;
  border: none;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }
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

export const DateInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DateIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${({ theme }) => theme.text.secondary};
  pointer-events: none;
`;

export const DateInput = styled(Input)`
  padding-left: 3rem;
  width: 100%;
  
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
`;

export const CategoryButton = styled.button<{ $active: boolean; $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background: ${({ theme, $active, $color }) => $active ? `${$color}20` : theme.bg.input};
  border: 2px solid ${({ $active, $color }) => $active ? $color : 'transparent'};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CategoryIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ $color }) => $color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
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

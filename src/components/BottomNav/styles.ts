import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.bg.secondary};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  z-index: 100;

  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
  }
`;

export const NavButton = styled.button<{ $active: boolean }>`
  background: ${({ theme, $active }) => $active ? 'rgba(139, 92, 246, 0.2)' : 'transparent'};
  border: none;
  color: ${({ theme, $active }) => $active ? theme.purple.primary : theme.text.tertiary};
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => 'rgba(139, 92, 246, 0.1)'};
    color: ${({ theme }) => theme.purple.primary};
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1rem;
    font-size: 0.6875rem;
    gap: 0.125rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 360px) {
    padding: 0.5rem 0.75rem;

    span {
      font-size: 0.625rem;
    }
  }
`;

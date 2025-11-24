import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  transition: width 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export const NavText = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
`;

import styled from 'styled-components';

export const DashboardContent = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 100px); /* Adjust based on header/nav height */
`;

export const Header = styled.div`
  margin-bottom: 0.5rem;
  
  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SplitView = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
`;

export const EditorArea = styled.div<{ isMobileHidden: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    display: ${({ isMobileHidden }) => (isMobileHidden ? 'none' : 'block')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.surface};
    z-index: 200;
    padding: 1rem;
  }
`;

export const ListArea = styled.div<{ isMobileHidden: boolean }>`
  width: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    display: ${({ isMobileHidden }) => (isMobileHidden ? 'none' : 'block')};
  }
`;

export const MobileBackButton = styled.button`
  display: none;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

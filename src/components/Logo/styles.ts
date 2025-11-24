import styled from 'styled-components';

export const Container = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: ${({ $size }) => {
        switch ($size) {
            case 'sm': return '1.25rem';
            case 'lg': return '2rem';
            default: return '1.5rem';
        }
    }};
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.purple.primary};
  font-weight: 900;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.purple.primary};
  opacity: 0.8;
  font-weight: 700;
`;

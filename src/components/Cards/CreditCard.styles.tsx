import styled from 'styled-components';

export const CardContainer = styled.div<{ color: string }>`
  width: 300px;
  height: 180px;
  background: ${({ color }) => color};
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    border-radius: 50%;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Chip = styled.div`
  width: 40px;
  height: 30px;
  background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const CardLogo = styled.div`
  font-weight: 700;
  font-style: italic;
  font-size: 1.2rem;
`;

export const CardNumber = styled.div`
  font-size: 1.4rem;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.7rem;
    opacity: 0.8;
    text-transform: uppercase;
  }
  
  strong {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

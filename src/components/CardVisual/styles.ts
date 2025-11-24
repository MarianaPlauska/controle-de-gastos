import styled from 'styled-components';

export const CardContainer = styled.div<{ $color: string }>`
  width: 100%;
  height: 220px;
  border-radius: 1.5rem;
  background: ${({ $color }) => `linear-gradient(135deg, ${$color}, ${$color}dd)`};
  padding: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px ${({ $color }) => $color}66;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px -12px ${({ $color }) => $color}88;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    z-index: 1;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
`;

export const Chip = styled.div`
  width: 50px;
  height: 35px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #94a3b8;
  }

  &::before {
    content: '';
    position: absolute;
    left: 30%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #94a3b8;
  }
`;

export const CardNumber = styled.div`
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 2;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Value = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

export const CardBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const BrandName = styled.span`
  font-weight: 800;
  font-style: italic;
  font-size: 1.5rem;
  opacity: 0.9;
`;

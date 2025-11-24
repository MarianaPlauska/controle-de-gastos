import styled from 'styled-components';

export const VoucherContainer = styled.div<{ color: string }>`
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
`;

export const VoucherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CompanyName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const BalanceContainer = styled.div`
  text-align: right;
`;

export const BalanceLabel = styled.span`
  font-size: 0.8rem;
  opacity: 0.9;
  display: block;
`;

export const BalanceValue = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const VoucherFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.1);
  margin: -1.5rem;
  padding: 1rem 1.5rem;
  margin-top: auto;
`;

export const DailyInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.75rem;
    opacity: 0.9;
  }
  
  strong {
    font-size: 1rem;
  }
`;

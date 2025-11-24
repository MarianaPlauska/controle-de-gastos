import React from 'react';
import { WalletView } from '../../components/Cards/WalletView';
import { PageContainer, Header } from './Cards.styles';

export const Cards: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <h1>Minha Carteira</h1>
        <p>Gerencie seus cartões de crédito e benefícios.</p>
      </Header>

      <WalletView />
    </PageContainer>
  );
};

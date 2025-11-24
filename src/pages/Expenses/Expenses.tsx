import React, { useState } from 'react';
import { ExpenseList } from '../../components/Expenses/ExpenseList';
import { SavingsGoals } from '../../components/Expenses/SavingsGoals';
import {
  PageContainer,
  Header,
  TabsContainer,
  Tab,
  ContentArea
} from './Expenses.styles';

export const Expenses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'expenses' | 'savings'>('expenses');

  return (
    <PageContainer>
      <Header>
        <h1>Gastos & Economias</h1>
        <p>Acompanhe suas despesas e suas metas de economia.</p>
      </Header>

      <TabsContainer>
        <Tab
          active={activeTab === 'expenses'}
          onClick={() => setActiveTab('expenses')}
        >
          Meus Gastos
        </Tab>
        <Tab
          active={activeTab === 'savings'}
          onClick={() => setActiveTab('savings')}
        >
          Metas de Economia
        </Tab>
      </TabsContainer>

      <ContentArea>
        {activeTab === 'expenses' ? <ExpenseList /> : <SavingsGoals />}
      </ContentArea>
    </PageContainer>
  );
};

import React from 'react';
import { SummaryCards } from '../../components/Dashboard/SummaryCards';
import { ExpenseChart } from '../../components/Dashboard/ExpenseChart';
import { Reminders } from '../../components/Dashboard/Reminders';
import { DashboardContent, WelcomeSection } from './Home.styles';

export const Home: React.FC = () => {
  return (
    <div>
      <WelcomeSection>
        <h1>Olá, Mariana! 👋</h1>
        <p>Aqui está o resumo das suas finanças hoje.</p>
      </WelcomeSection>

      <SummaryCards />

      <DashboardContent>
        <ExpenseChart />
        <Reminders />
      </DashboardContent>
    </div>
  );
};

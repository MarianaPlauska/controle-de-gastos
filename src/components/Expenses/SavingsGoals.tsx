import React from 'react';
import { Target, Plane, Car } from 'lucide-react';
import {
  SavingsContainer,
  Header,
  Title,
  GoalItem,
  GoalHeader,
  GoalInfo,
  GoalAmount,
  ProgressBar,
  Progress
} from './SavingsGoals.styles';

export const SavingsGoals: React.FC = () => {
  return (
    <SavingsContainer>
      <Header>
        <Title>Metas de Economia</Title>
        <Target size={20} color="#666" />
      </Header>

      <GoalItem>
        <GoalHeader>
          <GoalInfo>
            <Plane size={18} color="#0066cc" />
            <h4>Viagem Fim de Ano</h4>
          </GoalInfo>
          <GoalAmount>R$ 3.500 / R$ 5.000</GoalAmount>
        </GoalHeader>
        <ProgressBar>
          <Progress width="70%" color="#0066cc" />
        </ProgressBar>
      </GoalItem>

      <GoalItem>
        <GoalHeader>
          <GoalInfo>
            <Car size={18} color="#28a745" />
            <h4>Troca de Carro</h4>
          </GoalInfo>
          <GoalAmount>R$ 15.000 / R$ 45.000</GoalAmount>
        </GoalHeader>
        <ProgressBar>
          <Progress width="33%" color="#28a745" />
        </ProgressBar>
      </GoalItem>

      <GoalItem>
        <GoalHeader>
          <GoalInfo>
            <Target size={18} color="#ff9966" />
            <h4>Reserva de Emergência</h4>
          </GoalInfo>
          <GoalAmount>R$ 8.000 / R$ 10.000</GoalAmount>
        </GoalHeader>
        <ProgressBar>
          <Progress width="80%" color="#ff9966" />
        </ProgressBar>
      </GoalItem>
    </SavingsContainer>
  );
};

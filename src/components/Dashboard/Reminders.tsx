import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { RemindersContainer, ReminderHeader, ReminderTitle, ReminderList, ReminderItem, ReminderInfo, ReminderAmount } from './Reminders.styles';

export const Reminders: React.FC = () => {
    return (
        <RemindersContainer>
            <ReminderHeader>
                <ReminderTitle>Lembretes</ReminderTitle>
                <Bell size={20} color="#666" />
            </ReminderHeader>
            <ReminderList>
                <ReminderItem>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Calendar size={18} color="#0066cc" />
                        <ReminderInfo>
                            <h4>Fatura Nubank</h4>
                            <span>Vence em 2 dias</span>
                        </ReminderInfo>
                    </div>
                    <ReminderAmount>R$ 1.250,00</ReminderAmount>
                </ReminderItem>
                <ReminderItem>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Calendar size={18} color="#dc3545" />
                        <ReminderInfo>
                            <h4>Aluguel</h4>
                            <span>Vence hoje</span>
                        </ReminderInfo>
                    </div>
                    <ReminderAmount>R$ 2.500,00</ReminderAmount>
                </ReminderItem>
                <ReminderItem>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Calendar size={18} color="#28a745" />
                        <ReminderInfo>
                            <h4>Internet</h4>
                            <span>Vence em 5 dias</span>
                        </ReminderInfo>
                    </div>
                    <ReminderAmount>R$ 120,00</ReminderAmount>
                </ReminderItem>
            </ReminderList>
        </RemindersContainer>
    );
};

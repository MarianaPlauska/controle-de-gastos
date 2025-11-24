import React from 'react';
import { Home, CreditCard, PieChart, FileText } from 'lucide-react';
import { SidebarContainer, LogoContainer, NavMenu, NavItem, NavText } from './Sidebar.styles';
import { ThemeToggle } from '../UI/ThemeToggle';

export const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <LogoContainer>
                <h2>FinControl</h2>
            </LogoContainer>
            <NavMenu>
                <NavItem to="/" end>
                    <Home size={20} />
                    <NavText>Dashboard</NavText>
                </NavItem>
                <NavItem to="/cards">
                    <CreditCard size={20} />
                    <NavText>Carteira</NavText>
                </NavItem>
                <NavItem to="/expenses">
                    <PieChart size={20} />
                    <NavText>Gastos</NavText>
                </NavItem>
                <NavItem to="/notes">
                    <FileText size={20} />
                    <NavText>Anotações</NavText>
                </NavItem>
            </NavMenu>

            <div style={{ marginTop: 'auto' }}>
                <ThemeToggle />
            </div>
        </SidebarContainer>
    );
};

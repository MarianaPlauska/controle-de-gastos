import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { LayoutContainer, MainContent } from './Layout.styles';

import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';

export const Layout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar />
            <MainContent>
                <MobileHeader />
                <Outlet />
            </MainContent>
            <BottomNav />
        </LayoutContainer>
    );
};


import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

const Layout = ({children} : { children : React.ReactNode}) => {
    return (
           <SidebarProvider >
      <DashboardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    );
};

export default Layout;
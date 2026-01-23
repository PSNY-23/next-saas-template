import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { checkUserSession } from '@/utils/check-session';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  await checkUserSession();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;

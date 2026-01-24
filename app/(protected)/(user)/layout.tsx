import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { checkUserSession } from '@/utils/check-session';
import { UserCardDataType } from '@/types';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const { session } = await checkUserSession();
  const userCardData:UserCardDataType = {
    name: session.user.name || 'User',
    email: session.user.email || '',
    avatar: session.user.image || '/avatars/default.jpg',
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar userCardData={userCardData} />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;

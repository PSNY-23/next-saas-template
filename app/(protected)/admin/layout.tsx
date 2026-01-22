
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user.role) {
      redirect('/login');
    };
    if(session.user.role === 'user') {
      redirect('/dashboard')
    }

  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className='flex-1'>
          <SidebarTrigger />
          <AdminHeader/>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;

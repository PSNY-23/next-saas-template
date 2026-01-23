
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { chekcAdminSession } from "@/utils/check-session";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
   await chekcAdminSession();
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className='flex-1'>
          <AdminHeader/>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;

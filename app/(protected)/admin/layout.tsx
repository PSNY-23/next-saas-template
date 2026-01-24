
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { chekcAdminSession } from "@/utils/check-session";
import { UserCardDataType } from '@/types';

const ProtectedLayout = async ({ 
  children,
 
 }: { 
  children: React.ReactNode,
 
 }) => {
   const {session } = await chekcAdminSession();
   const userCardData:UserCardDataType = {
     name: session.user.name || 'Admin',
     email: session.user.email || '',
     avatar: session.user.image || '/avatars/default.jpg',
   };
  return (
    <>
      <SidebarProvider>
        <AdminSidebar userCardData={userCardData} />
        <main className='flex-1'>
          <AdminHeader/>
          {children}
          
        </main>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;

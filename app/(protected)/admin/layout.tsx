import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { chekcAdminSession } from "@/utils/check-session";
import { UserCardDataType } from "@/types";

const ProtectedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { session } = await chekcAdminSession();
  const userCardData: UserCardDataType = {
    name: session.user.name || "Admin",
    email: session.user.email || "",
    avatar: session.user.image || "/avatars/default.jpg",
  };
  return (
    <SidebarProvider>
      <AdminSidebar userCardData={userCardData} />
      <SidebarInset className="min-h-0 flex flex-col">
        <AdminHeader />
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;

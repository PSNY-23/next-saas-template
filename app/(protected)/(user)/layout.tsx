import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { checkUserSession } from "@/utils/check-session";
import { UserCardDataType } from "@/types";
import { UserHeader } from "@/components/dashboard/user-header";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const { session } = await checkUserSession();
  const userCardData: UserCardDataType = {
    name: session.user.name || "User",
    email: session.user.email || "",
    avatar: session.user.image || "/avatars/default.jpg",
  };
  return (
    <SidebarProvider>
      <AppSidebar userCardData={userCardData} />
      <SidebarInset className="min-h-0 flex flex-col">
        <UserHeader />
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;

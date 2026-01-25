import { SidebarTrigger } from "@/components/ui/sidebar";

export const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <SidebarTrigger className="-ml-1 size-8" />
        <div className="flex flex-1 items-center justify-between">
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};
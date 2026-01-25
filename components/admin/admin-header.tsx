import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../mode-toggle";

export const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex justify-between h-14 items-center gap-4 px-4 md:px-6">
        <SidebarTrigger className="-ml-1" />
        <span className="text-sm font-medium">
          <ModeToggle/>
        </span>
      </div>
    </header>
  );
};
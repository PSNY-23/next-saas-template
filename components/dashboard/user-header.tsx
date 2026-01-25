import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "../site-logo";
import { SidebarTrigger } from "../ui/sidebar";

export const UserHeader = () => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex justify-between h-14 items-center gap-4 px-4 md:px-6">
        <SidebarTrigger className="-ml-1" />
        <div>
          <ModeToggle/>
        </div>
      </div>
    </header>
  );
};

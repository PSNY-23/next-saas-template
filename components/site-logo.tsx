"use client";

import { useContext } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@/components/ui/sidebar";

interface SiteLogoProps {
  className?: string;
}
export const SiteLogo = ({ className }: SiteLogoProps) => {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={
          theme === "dark"
            ? "/images/logo/logo-light.svg"
            : "/images/logo/logo-dark.svg"
        }
        alt="Site Logo"
        width={32}
        height={32}
        className={cn(className)}
      />

      <span className="text-xl font-semibold mask-r-from-accent-foreground">Alchemist</span>
    </Link>
  );
};

export const Logo = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const sidebar = useContext(SidebarContext);
  const isExpanded = sidebar?.open ?? true;

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src={
          theme === "dark"
            ? "/images/logo/logo-light.svg"
            : "/images/logo/logo-dark.svg"
        }
        alt="Site Logo"
        width={16}
        height={16}
        className="h-6 w-6 shrink-0 object-contain"
      />
      <span
        className={cn(
          " truncate font-semibold transition-all duration-150 ease-in-out",
          !isExpanded && "hidden"
        )}
      >
        Alchemist
      </span>
    </Link>
  );
}
;
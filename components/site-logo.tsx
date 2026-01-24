import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface SiteLogoProps {
  className?: string;
}
export const SiteLogo = ({ className }: SiteLogoProps) => {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
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

      <span className="text-3xl font-semibold mask-r-from-accent-foreground">Alchemist</span>
    </Link>
  );
};

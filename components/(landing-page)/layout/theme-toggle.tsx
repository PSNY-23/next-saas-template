'use client'
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="theme toggler"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="group flex h-8 w-8 items-center justify-center duration-300"
    >
      <span className="group-hover:rotate-180 transition-transform duration-700 ease-in-out">
        <SunIcon width="24" height="24" className="hidden dark:block"/>
        <MoonIcon width="24" height="24" className="dark:hidden" style={{ color: '#000' }} />
      </span>
    </button>
  );
};

export default ThemeToggler;

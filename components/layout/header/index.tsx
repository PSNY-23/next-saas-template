"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeader from "./Navigation/MobileHeader";
import ThemeToggler from "./ThemeToggle";
import { layoutData } from "@/utils/data";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { SiteLogo } from "@/components/site-logo";
import { StartMoonIcon } from "@/public/svg/star-moon";
import { HamburgerIcon } from "@/public/svg/hamburger";

const { headerData } = layoutData;

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  banned: boolean | null | undefined;
  role?: string | null | undefined;
  banReason?: string | null | undefined;
  banExpires?: Date | null | undefined;
}

const Header = () => {
  const { data, error, isPending } = authClient.useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuData, setMenuData] = useState(headerData);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const { themes, setTheme } = useTheme();

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Run only once on initial mount
    if (!hasMounted.current) {
      hasMounted.current = true;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    authClient.signOut();
    setUser(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 z-50 w-full`}>
        <div className="px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
          <div className="container">
            <nav
              className={`flex items-center py-2.5 px-4 md:px-8 justify-between w-full relative z-10 ${
                sticky
                  ? "shadow-sm bg-background/95 dark:bg-dark_black/95 backdrop-blur-md border-b border-border"
                  : "bg-transparent border-b border-transparent"
              } `}
            >
              <div className="flex items-center">
                <SiteLogo />
              </div>
              <div className="hidden lg:flex bg-dark_black/5 dark:bg-white/5 rounded-3xl p-3">
                <ul className="flex gap-0.5 xl:gap-1 text-sm">
                  {menuData?.map((item, index) => (
                    <HeaderLink key={index} item={item} />
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                {/* ---------------------SignUp SignIn Button-----------------  */}
                {data?.user ? (
                  <div className="hidden lg:flex gap-4">
                    <button
                      onClick={() => handleSignOut()}
                      className="flex group font-normal items-center gap-1 transition-all duration-200 ease-in-out text-white px-4 py-2 bg-dark_black dark:bg-white/15 rounded-full hover:text-dark_black hover:bg-white dark:hover:bg-white/5 dark:hover:text-white border border-dark_black"
                    >
                      Sign Out
                      <Icon
                        icon="solar:logout-outline"
                        width="25"
                        height="25"
                      />
                    </button>
                    <div className="relative group">
                      <Image
                        src="/images/home/avatar_1.jpg"
                        alt="Image"
                        width={40}
                        height={40}
                        quality={100}
                        className="rounded-full cursor-pointer"
                      />
                      <p className="absolute w-fit text-sm text-center z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-white/5 text-dark_black/60 p-1 min-w-28 rounded-lg shadow-2xl top-full left-1/2 transform -translate-x-1/2 mt-3">
                        {data.user.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href={"/login"}
                      className="hidden text-sm lg:block bg-transparent border border-dark_black dark:border-white/50 text-foreground px-3 xl:px-5 py-2 rounded-full hover:bg-dark_black hover:text-white transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      className="hidden text-sm lg:block text-white px-3 xl:px-5 py-2 bg-dark_black dark:bg-white/20 rounded-full hover:opacity-90 transition-opacity"
                    >
                      Register
                    </Link>
                  </div>
                )}

                {/* ---------------------Light/Dark Mode button-------------------- */}
                <ThemeToggler />

                <div className="flex items-center gap-1.5 lg:hidden">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 hover:bg-dark_black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                  >
                    <StartMoonIcon />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* ------------------------- Mobile sidebar starts ------------------------- */}
        {sidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-dark_black shadow-lg transform transition-transform duration-300 max-w-xs ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <p className="text-lg font-bold">Menu</p>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close mobile menu"
            >
              <HamburgerIcon />
            </button>
          </div>
          <div className="p-4">
            <ul className="flex flex-col">
              {menuData &&
                menuData?.map((item, index) => (
                  <MobileHeader key={index} item={item} />
                ))}
              <div className="flex flex-col items-center gap-3 px-2 mt-2">
                {data?.user ? (
                  <>
                    <button
                      onClick={() => authClient.signOut()}
                      className="flex w-full group font-normal items-center gap-2 transition-all duration-200 ease-in-out text-white dark:text-dark_black px-4 py-2 bg-dark_black rounded-md hover:text-dark_black hover:bg-white border border-dark_black"
                    >
                      Sign Out
                      <Icon
                        icon="solar:logout-outline"
                        width="25"
                        height="25"
                      />
                    </button>
                    <div className="group flex gap-2 items-center w-full border border-dark_black dark:border-white px-4 py-2 rounded-md hover:bg-dark_black transition-all duration-200 ease-in-out">
                      <Image
                        src="/images/home/avatar_1.jpg"
                        alt="Image"
                        width={25}
                        height={25}
                        quality={100}
                        className="rounded-full cursor-pointer"
                      />
                      <p className="group-hover:text-white text-dark_black dark:text-white w-full capitalize">
                        {data.user.email || data?.user.name}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href={"/signin"}
                      className="w-full border border-dark_black dark:border-white text-primary px-4 py-2 rounded-md hover:bg-dark_black dark:hover:bg-white hover:text-white dark:hover:text-dark_black text-center font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={"/signup"}
                      className="w-full text-white dark:text-dark_black px-4 py-2 bg-dark_black dark:bg-white rounded-md hover:opacity-90 text-center font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

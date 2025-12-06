"use client"

import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

import React from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/destinations", label: "Destinations", role: "PUBLIC" },
  { href: "/trips", label: "Trips", role: "PUBLIC" },
  // { href: "/admin", label: "Dashboard", },
  // { href: "/admin", label: "Dashboard",},
  // { href: "/user", label: "Dashboard", },
];

export default function Navbar() {
  const pathname = usePathname()

  
  return (
    <header>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link href={link.href}>{link.label} </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <Link href="/" className="text-blue-800 font-semibold text-xl">
            {/* <Logo /> */}
            Way<span className="text-blue-400">fare</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {/* Navigation menu */}
          <NavigationMenu className="hidden md:flex!">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <React.Fragment key={index}>
                  {link.role === "PUBLIC" && (
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={`text-gray-600 hover:text-primary py-1.5 font-medium ${pathname.split("/")[1] === link.label.toLowerCase() ? "text-primary bg-gray-100 font-semibold" : ""}`}>
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                  {/* {link.role === data?.data?.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )} */}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
         <AuthButton/>
        </div>
      </div>
    </header>
  );
}

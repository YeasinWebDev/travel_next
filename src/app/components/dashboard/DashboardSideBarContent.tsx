"use client";

import { IUser } from "@/src/app/types/trips.types";
import * as Icons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type LucideIconName = Exclude<keyof typeof Icons, "createLucideIcon" | "default">;

interface INavLink {
  title: string;
  url: string;
  icon: LucideIconName | string;
}

function DashboardSideBarContent({ user, navLinks }: { user: Partial<IUser>; navLinks: INavLink[] }) {
  const pathname = usePathname();

  return (
    <div>
      {navLinks.map((link, index) => {
        const Icon = typeof link.icon === "string" && link.icon in Icons ? (Icons[link.icon as LucideIconName] as React.ElementType) : null;

        const isActive = pathname === link.url;

        return (
          <Link key={index} href={link.url} className={`flex items-center p-3 rounded-sm gap-3 ${isActive ? "bg-gray-200 font-semibold" : ""}`}>
            {Icon && <Icon size={20} />}
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

export default DashboardSideBarContent;

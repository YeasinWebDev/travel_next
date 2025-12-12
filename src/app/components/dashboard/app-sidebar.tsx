// "use client";

import * as React from "react";
// import { useEffect, useState } from "react";
import Link from "next/link";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/src/app/components/ui/sidebar";

import { getNavItemsByRole } from "@/src/app/lib/navItems.config";
import DashboardSideBarContent from "./DashboardSideBarContent";
import UserCard from "./UserCard";
// import { Spinner } from "../ui/spinner";
import { getUser } from "../../services/auth/getme";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const userInfo =  await getUser();
  const navItems = getNavItemsByRole(userInfo?.role || []);
  // const [userInfo, setUserInfo] = useState<any>(null);
  // const [navItems, setNavItems] = useState<any[]>([]);

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const user = await getUser();
  //     setUserInfo(user);
  //     const nav = getNavItemsByRole(user?.role || []);
  //     setNavItems(nav);
  //   };
  //   fetchData();
  // }, []);

  // // Show loading while fetching user info
  // if (!userInfo) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="text-blue-600 font-bold text-xl flex items-center justify-center border hover:text-blue-800!">
                WayFare
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <DashboardSideBarContent user={userInfo} navLinks={navItems} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserCard userInfo={userInfo} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

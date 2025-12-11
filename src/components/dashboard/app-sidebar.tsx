import * as React from "react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/src/components/ui/sidebar";
import Link from "next/link";
import { getUser } from "@/src/services/auth/getme";
import { getNavItemsByRole } from "@/src/lib/navItems.config";
import DashboardSideBarContent from "./DashboardSideBarContent";
import UserCard from "./UserCard";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = await getUser();
  const navItems = getNavItemsByRole(userInfo?.role || []);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="text-blue-800 font-semibold text-xl flex items-center justify-center border hover:text-blue-900!">
                Wayfare
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

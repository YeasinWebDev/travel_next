// /app/(dashboard)/layout.js - ONLY for normal dashboard pages
"use client";

import { AppSidebar } from "@/src/app/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/app/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Assume this is only called for real dashboard pages
  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />
      <div className="p-4 lg:p-6 w-full">
        <SidebarTrigger />
        <div className="mt-5 flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
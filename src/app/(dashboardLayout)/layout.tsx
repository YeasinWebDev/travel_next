import { AppSidebar } from "@/src/app/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/app/components/ui/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider className="overflow-hidden">
        <AppSidebar />
        <div className="p-4 lg:p-6 w-full">
          <SidebarTrigger />
          <div className="mt-5 flex-1">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;

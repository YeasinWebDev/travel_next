export const dynamic = 'force-dynamic'; 

import DashboardUserHeader from "@/src/app/components/dashboard/admin/user/DashboardUserHeader";
import DashboardUserTable from "@/src/app/components/dashboard/admin/user/DashboardUserTable";
import ClearFilters from "@/src/app/components/shared/ClearFilters";
import Pagination from "@/src/app/components/shared/Pagination";
import SearchFilter from "@/src/app/components/shared/SearchFilter";
import SelectFilter from "@/src/app/components/shared/SelectFilter";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { getAll } from "@/src/app/services/auth/user";

async function DashboardUsersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);
  const allUsers = await getAll(querystring);

  return (
    <>
      <DashboardUserHeader />
      <div className="flex items-center gap-5  mt-4">
        <SearchFilter placeholder="Search User" paramName="search" />
        <SelectFilter options={[{label: "Active", value: "active"}, {label: "Inactive", value: "inactive"}]} paramName="status"/>
        <ClearFilters route='/admin/users'/>
      </div>
      <DashboardUserTable users={allUsers.data} />
      <div className="mt-10">
        <Pagination currentPage={allUsers.data.meta.page} totalPages={allUsers.data.meta.totalPages} />
      </div>
    </>
  );
}

export default DashboardUsersPage;

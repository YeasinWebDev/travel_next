import DashboardUserHeader from "@/src/components/dashboard/admin/user/DashboardUserHeader";
import DashboardUserTable from "@/src/components/dashboard/admin/user/DashboardUserTable";
import Pagination from "@/src/components/shared/Pagination";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAll } from "@/src/services/auth/user";

async function DashboardUsersPage({ searchParams }: { searchParams: any }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);
  const allUsers = await getAll(querystring);
  
  return (
    <div>
      <DashboardUserHeader />
      <DashboardUserTable users={allUsers.data} />
      <div className="mt-10">
        <Pagination currentPage={allUsers.data.meta.page} totalPages={allUsers.data.meta.totalPages} />
      </div>
    </div>
  );
}

export default DashboardUsersPage;

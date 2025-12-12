
import DashboardDivisionTable from "@/src/components/dashboard/admin/division/DashboardDivisionTable";
import DashboardDivisionHeader from "@/src/components/dashboard/admin/division/DashbordDivisionHeader";
import ClearFilters from "@/src/components/shared/ClearFilters";
import Pagination from "@/src/components/shared/Pagination";
import SearchFilter from "@/src/components/shared/SearchFilter";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllDivisions } from "@/src/services/division/division";

async function DashboardDivisionPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);
  const allDivision = await getAllDivisions(querystring);

  return (
    <>
      <DashboardDivisionHeader />
      <div className="mt-5 flex items-center gap-5">
        <SearchFilter placeholder="Search division..." paramName="search" />
        <ClearFilters route="/admin/division" />
      </div>
      <DashboardDivisionTable divisions={allDivision?.data?.data} />

      <div className="mt-10">
        <Pagination currentPage={allDivision?.data?.meta.page} totalPages={allDivision?.data?.meta.totalPages} />
      </div>
    </>
  );
}

export default DashboardDivisionPage;

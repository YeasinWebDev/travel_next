export const dynamic = "force-dynamic";


import DashboardDestinationHeader from "@/src/components/dashboard/admin/destination/DashboardDestinationHeader";
import DashboardDestinationTable from "@/src/components/dashboard/admin/destination/DashboardDestinationTable";
import ClearFilters from "@/src/components/shared/ClearFilters";
import Pagination from "@/src/components/shared/Pagination";
import SearchFilter from "@/src/components/shared/SearchFilter";
import SelectFilter from "@/src/components/shared/SelectFilter";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllDestinations } from "@/src/services/destination/destination";
import { getAllDivisions } from "@/src/services/division/division";
import { IDivision } from "@/src/types/division.types";

async function DashboardDestinationPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);
  const allDestinations = await getAllDestinations(querystring);
  const allDivisions = await getAllDivisions();

  const division = allDivisions?.data?.data.map((d: IDivision) => {
    return {
      label: d.name,
      value: d._id
    }
  })
  return (
    <>
      <DashboardDestinationHeader divisions={division}/>
      <div className="flex flex-wrap items-center gap-5 mt-5">
        <SearchFilter placeholder="Search Destination" paramName="search" />
        <SelectFilter options={division} paramName="division" />
        <ClearFilters route = '/admin/destination'/>
      </div>
      <DashboardDestinationTable allDestinations={allDestinations?.data?.data} divisions={division}/>
      <div className="mt-10">
        <Pagination currentPage={allDestinations?.data?.meta.page} totalPages={allDestinations?.data?.meta.totalPages} />
      </div>
    </>
  );
}

export default DashboardDestinationPage;

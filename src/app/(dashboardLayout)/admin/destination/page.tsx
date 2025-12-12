// /app/admin/destination/page.js
export const dynamic = 'force-dynamic'; // Add this

import DashboardDestinationHeader from "@/src/app/components/dashboard/admin/destination/DashboardDestinationHeader";
import DashboardDestinationTable from "@/src/app/components/dashboard/admin/destination/DashboardDestinationTable";
import ClearFilters from "@/src/app/components/shared/ClearFilters";
import Pagination from "@/src/app/components/shared/Pagination";
import SearchFilter from "@/src/app/components/shared/SearchFilter";
import SelectFilter from "@/src/app/components/shared/SelectFilter";
import { Spinner } from "@/src/app/components/ui/spinner";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { getAllDestinations } from "@/src/app/services/destination/destination";
import { getAllDivisions } from "@/src/app/services/division/division";
import { IDivision } from "@/src/app/types/division.types";

export default async function DashboardDestinationPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const querystring = queryStringFormatter(searchParams);
  
  // Fetch data directly in server component
  const [destinationsData, divisionsData] = await Promise.all([
    getAllDestinations(querystring),
    getAllDivisions()
  ]);
  
  const allDestinations = destinationsData?.data?.data || [];
  const allDivisions = divisionsData?.data?.data || [];
  
  const divisionOptions = allDivisions.map((d: IDivision) => ({
    label: d.name,
    value: d._id
  }));

  return (
    <>
      <DashboardDestinationHeader divisions={divisionOptions}/>
      <div className="flex flex-wrap items-center gap-5 mt-5">
        <SearchFilter placeholder="Search Destination" paramName="search" />
        <SelectFilter options={divisionOptions} paramName="division" />
        <ClearFilters route='/admin/destination'/>
      </div>
      <DashboardDestinationTable allDestinations={allDestinations} divisions={divisionOptions}/>
      <div className="mt-10">
        <Pagination currentPage={1} totalPages={1} />
      </div>
    </>
  );
}
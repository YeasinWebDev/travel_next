export const dynamic = "force-dynamic";


import DashboardTripsFilter from "@/src/components/dashboard/admin/trips/DashboardTripsFilter";
import DashboardTripsHeader from "@/src/components/dashboard/admin/trips/DashboardTripsHeader";
import DashboardTripsTable from "@/src/components/dashboard/admin/trips/DashboardTripsTable";
import Pagination from "@/src/components/shared/Pagination";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllTrips } from "@/src/services/trips/trips";

async function DashboardTripsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);
  const alltrips = await getAllTrips(querystring);

  return (
    <>
      <DashboardTripsHeader />
      <DashboardTripsFilter/>

      <DashboardTripsTable allTrips={alltrips?.data?.data} />

      <div className="mt-10">
        <Pagination currentPage={alltrips?.data?.meta.page} totalPages={alltrips?.data?.meta.totalPages} />
      </div>
    </>
  );
}

export default DashboardTripsPage;

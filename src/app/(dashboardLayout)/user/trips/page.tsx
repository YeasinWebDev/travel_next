export const dynamic = 'force-dynamic'; // Add this

import DashboardTripsFilter from "@/src/app/components/dashboard/admin/trips/DashboardTripsFilter";
import UserTripsHeader from "@/src/app/components/dashboard/user/trips/UserTripsHeader";
import { TripTable } from "@/src/app/components/dashboard/user/trips/UserTripTable";
import Pagination from "@/src/app/components/shared/Pagination";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { getAllDestinations } from "@/src/app/services/destination/destination";
import { myTrips } from "@/src/app/services/trips/trips";
import { IDestination } from "@/src/app/types/destination.types";

async function UserTripsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const destinations = await getAllDestinations();
  const allTrips = await myTrips(querystring);

  const allDestinations = destinations?.data?.data.map((i:IDestination) => {
    return {
      name: i.name,
      id: i._id,
    };
  });

  return (
    <>
      <UserTripsHeader />
      <DashboardTripsFilter route="/user/trips" />
      <TripTable trips={allTrips?.data?.data} destinations={allDestinations} />

      <div className="mt-10">
        <Pagination currentPage={allTrips?.data?.meta.page} totalPages={allTrips?.data?.meta.totalPages} />
      </div>
    </>
  );
}

export default UserTripsPage;

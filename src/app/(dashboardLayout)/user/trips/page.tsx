import DashboardTripsFilter from "@/src/components/dashboard/admin/trips/DashboardTripsFilter";
import UserTripsHeader from "@/src/components/dashboard/user/trips/UserTripsHeader";
import { TripTable } from "@/src/components/dashboard/user/trips/UserTripTable";
import Pagination from "@/src/components/shared/Pagination";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllDestinations } from "@/src/services/destination/destination";
import {myTrips } from "@/src/services/trips/trips";

async function UserTripsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const destinations = await getAllDestinations();
  const allTrips = await myTrips(querystring);

  const allDestinations = destinations?.data?.data.map((i) => {
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

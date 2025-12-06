import ClearFilters from "@/src/components/shared/ClearFilters";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";
import Pagination from "@/src/components/shared/Pagination";
import SearchFilter from "@/src/components/shared/SearchFilter";
import TripCard from "@/src/components/trip/TripCard";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllTrips } from "@/src/services/trips/trips";
import { ITrip } from "@/src/types/trips.types";

export const metadata = {
  title: "Trips - Wayfare",
  description: "Plan your next trip with Wayfare",
};

async function TripsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const allTrips = await getAllTrips(querystring);
  const trips = allTrips?.data?.data;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center">Explore Trips</h1>
      <p className="text-center text-gray-600 mt-2">Find your perfect travel spot by searching and filtering below.</p>
      <div className="flex items-center justify-center mt-10 gap-5 flex-wrap">
        <SearchFilter placeholder="Search trips..." paramName="trip" />
        <DateRangeFilter />
        <ClearFilters route="/trips" />
      </div>

      {trips?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 w-full">
          {trips?.map((trip: ITrip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No Trips found</p>
      )}

      <Pagination currentPage={allTrips?.data?.meta?.page} totalPages={ allTrips?.data?.meta?.totalPages}/>
    </div>
  );
}

export default TripsPage;

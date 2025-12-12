import { getAllTrips } from "../../services/trips/trips";
import HeaderSection from "../shared/HeaderSection";
import TripCard from "../trip/TripCard";
import { ITrip } from "@/src/app/types/trips.types";

// Helper to merge trip + destination

export default async function FeaturedTrips() {
  const allTrips = await getAllTrips();
  
  const trips = allTrips?.data?.data;

  return (
    <section className=" px-6 md:px-20 py-16">
      <HeaderSection title="Featured Trips" description="Browse featured trips designed to create lasting memories and breathtaking moments of adventure." />

        {trips?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10 w-full">
            {trips?.slice(0, 4)?.map((trip: ITrip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No Trips found</p>
        )}
    </section>
  );
}

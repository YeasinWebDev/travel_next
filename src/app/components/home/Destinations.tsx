import HeaderSection from "../shared/HeaderSection";
import DestinationCard from "../DestinationCard";
import { IDestination } from "@/src/app/types/destination.types";
import { getAllDestinations } from "../../services/destination/destination";

async function Destinations() {
  const allDestinations = await getAllDestinations();

  const destinations = allDestinations?.data?.data;
  return (
    <div className="px-6 md:px-20 py-16 bg-gray-50">
      {/* Header */}
      <HeaderSection title="Explore Top Destinations" description="Discover breathtaking locations, hidden gems, and unforgettable travel experiences across Bangladesh." />

      {/* Card Grid */}
      {destinations.length === 0 ? (
        <div className="w-full flex items-center justify-center">No destinations found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {destinations?.slice(0, 4).map((destination: IDestination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;

import DestinationCard from "@/src/app/components/DestinationCard";
import ClearFilters from "@/src/app/components/shared/ClearFilters";
import Pagination from "@/src/app/components/shared/Pagination";
import SearchFilter from "@/src/app/components/shared/SearchFilter";
import SelectFilter from "@/src/app/components/shared/SelectFilter";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { IDestination } from "@/src/app/types/destination.types";
import { IDivision } from "@/src/app/types/division.types";

import { Metadata } from "next";
import { getAllDivisions } from "../../services/division/division";
import { getAllDestinations } from "../../services/destination/destination";

export const metadata: Metadata = {
  title: "Destinations - Wayfare",
  description: "Plan your next trip with Wayfare",
};

async function DestinationsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const allDivision = await getAllDivisions();
  const division = allDivision?.data?.data.map((d: IDivision) => {
    return {
      label: d.name,
      value: d._id,
    };
  });

  const allDestinations = await getAllDestinations(querystring);
  const destinations = allDestinations?.data?.data;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center">Explore Destinations</h1>
      <p className="text-center text-gray-600 mt-2">Find your perfect travel spot by searching and filtering below.</p>
      <div className="flex items-center justify-center mt-10 gap-5 flex-wrap">
        <SearchFilter placeholder="Search destinations..." paramName="search" />
        <SelectFilter options={division} paramName="division" defaultValue="division" />
        <ClearFilters  route="/destinations"/>
      </div>

      {destinations?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 w-full">
          {destinations?.map((destination: IDestination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 my-10">No destinations found</p>
      )}

      <Pagination currentPage={allDestinations?.data?.meta?.page} totalPages={allDestinations?.data?.meta?.totalPages} />
    </div>
  );
}

export default DestinationsPage;

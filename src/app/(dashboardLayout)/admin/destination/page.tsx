"use client";

import DashboardDestinationHeader from "@/src/components/dashboard/admin/destination/DashboardDestinationHeader";
import DashboardDestinationTable from "@/src/components/dashboard/admin/destination/DashboardDestinationTable";
import ClearFilters from "@/src/components/shared/ClearFilters";
import Pagination from "@/src/components/shared/Pagination";
import SearchFilter from "@/src/components/shared/SearchFilter";
import SelectFilter from "@/src/components/shared/SelectFilter";
import { Spinner } from "@/src/components/ui/spinner";
import { queryStringFormatter } from "@/src/lib/formater";
import { getAllDestinations } from "@/src/services/destination/destination";
import { getAllDivisions } from "@/src/services/division/division";
import { IDivision } from "@/src/types/division.types";
import { useEffect, useState } from "react";

export default function DashboardDestinationPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [allDestinations, setAllDestinations] = useState<any>(null);
  const [divisions, setDivisions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querystring = queryStringFormatter(searchParams);
      const destinations = await getAllDestinations(querystring);
      const allDivisions = await getAllDivisions();

      const divisionOptions = allDivisions?.data?.data.map((d: IDivision) => ({
        label: d.name,
        value: d._id
      }));

      setAllDestinations(destinations?.data?.data || []);
      setDivisions(divisionOptions || []);
    };
    fetchData();
  }, [searchParams]);

  if (!allDestinations || !divisions) {
    return <div><Spinner className="size-20" color="black"/></div>;
  }

  return (
    <>
      {/* <DashboardDestinationHeader divisions={divisions}/> */}
      <div className="flex flex-wrap items-center gap-5 mt-5">
        <SearchFilter placeholder="Search Destination" paramName="search" />
        <SelectFilter options={divisions} paramName="division" />
        <ClearFilters route='/admin/destination'/>
      </div>
      {/* <DashboardDestinationTable allDestinations={allDestinations} divisions={divisions}/> */}
      <div className="mt-10">
        <Pagination currentPage={1} totalPages={1} /> {/* adjust if you store meta info */}
      </div>
    </>
  );
}

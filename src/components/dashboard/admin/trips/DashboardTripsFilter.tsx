"use client";

import ClearFilters from "@/src/components/shared/ClearFilters";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";
import SearchFilter from "@/src/components/shared/SearchFilter";
import { useSidebar } from "@/src/components/ui/sidebar";

function DashboardTripsFilter({route='/admin/trips'}:{route?:string}) {
  const { state } = useSidebar();
  return (
    <div className={`flex items-center mt-5 gap-5 flex-wrap ${state === "expanded" ? "w-full md:w-[60%] lg:w-[87%]" : "flex"}`}>
      <SearchFilter placeholder="Search trips..." paramName="trip" />
      <DateRangeFilter route={route}/>
      <ClearFilters route={route}/>
    </div>
  );
}

export default DashboardTripsFilter;

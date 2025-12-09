"use client";

import ClearFilters from "@/src/components/shared/ClearFilters";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";
import SearchFilter from "@/src/components/shared/SearchFilter";
import { useSidebar } from "@/src/components/ui/sidebar";

function DashboardTripsFilter() {
  const { state } = useSidebar();
  return (
    <div className={`flex items-center mt-10 gap-5 flex-wrap ${state === "expanded" ? "w-full md:w-[60%] lg:w-[87%]" : "flex"}`}>
      <SearchFilter placeholder="Search trips..." paramName="trip" />
      <DateRangeFilter route="/admin/trips" />
      <ClearFilters route="/admin/trips" />
    </div>
  );
}

export default DashboardTripsFilter;

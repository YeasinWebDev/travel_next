"use client";

import { DashboardHeader } from "../../DashboadHeader";

function UserTripsHeader() {


  return (
    <>
      <DashboardHeader
        title="Trips Management"
        description="Manage Trips information and details"
      />

      {/* <TripForm destinations={getAllDestinations} visible={isOpen} onCancel={()=> setIsOpen(false)} isLoading={false}/> */}
    </>
  );
}

export default UserTripsHeader;

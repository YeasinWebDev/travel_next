"use client";

import { Plus } from "lucide-react";
import { DashboardHeader } from "../../DashboadHeader";
import { useState } from "react";

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

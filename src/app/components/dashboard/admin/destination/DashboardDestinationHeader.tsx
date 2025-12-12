"use client";

import React, { useState } from "react";
import { DashboardHeader } from "../../DashboadHeader";
import { Plus } from "lucide-react";
import DestinationModel from "./DestinationModel";

function DashboardDestinationHeader({ divisions }: { divisions: Array<{ value: string; label: string }> }) {
  const [dialog, setDialog] = useState(false);
  const handleOpenDialog = () => {
    setDialog(true);
  };
  return (
    <>
      <DashboardHeader
        title="Destination Management"
        description="Manage Destination information and details"
        action={{
          label: "Add Destination",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
        <DestinationModel open={dialog} onOpenChange={setDialog} divisions={divisions}/>
    </>
  );
}

export default DashboardDestinationHeader;

"use client";

import { useState } from "react";
import { DashboardHeader } from "../../DashboadHeader";
import { Plus } from "lucide-react";
import { DivisionModal } from "./DashboardDivisionModal";

function DashboardDivisionHeader() {
  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };
  return (
    <>
      <DashboardHeader
        title="Division Management"
        description="Manage Division information and details"
        action={{
          label: "Add Division",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />

      <DivisionModal isOpen={dialog} onClose={() => setDialog(false)} />
    </>
  );
}

export default DashboardDivisionHeader;

"use client"

import { DashboardHeader } from '@/src/app/components/dashboard/DashboadHeader'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import DashboardAdminCreateModal from './DashboardAdminCreateModal'

function DashboardUserHeader() {
  const [dialog, setDialog] = useState(false)
    const handleOpenDialog = () => {
      setDialog(true)
    }
  return (
    <>
     <DashboardHeader
        title="Users Management"
        description="Manage Users information and details"
        action={{
          label: "Add Admin",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
      <DashboardAdminCreateModal open={dialog} setOpen={setDialog} />
    </>
  )
}

export default DashboardUserHeader
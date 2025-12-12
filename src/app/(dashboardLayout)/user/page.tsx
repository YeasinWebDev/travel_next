import AnalyticsPage from '@/src/components/dashboard/user/Analytics'
import { getAllStatsForUser } from '@/src/services/stats/stats'
import React from 'react'

async function page() {
  const data = await getAllStatsForUser()
  console.log(data?.data)

  return (
    <>
    <AnalyticsPage data={data?.data}/>
    </>
  )
}

export default page
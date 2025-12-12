import AnalyticsPage from '@/src/components/dashboard/user/Analytics'
import { getAllStatsForUser } from '@/src/services/stats/stats'

async function page() {
  const data = await getAllStatsForUser()

  return (
    <>
    <AnalyticsPage data={data?.data}/>
    </>
  )
}

export default page
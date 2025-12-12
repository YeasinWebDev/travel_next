export const dynamic = 'force-dynamic'; 

import AnalyticsPage from '@/src/app/components/dashboard/user/Analytics'
import { getAllStatsForUser } from '../../services/stats/stats'

async function page() {
  const data = await getAllStatsForUser()

  return (
    <div>
    <AnalyticsPage data={data?.data}/>
    </div>
  )
}

export default page
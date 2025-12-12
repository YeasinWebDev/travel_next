
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent} from "../../components/ui/tabs"
import { StatsCards } from "@/src/app/components/dashboard/admin/dashboard/stats-cards"
import { RevenueChart } from "@/src/app/components/dashboard/admin/dashboard/revenue-chart"
import { TopUsers } from "@/src/app/components/dashboard/admin/dashboard/top-users"
import { getAllStats } from "../../services/stats/stats"


export default async function DashboardPage() {
  const res = await getAllStats()
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        
        <TabsContent value="overview" className="space-y-4">
          <StatsCards stats={res.data.stats} />
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Total revenue from bookings and payments
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart statsByMonth={res.data.statsByMonth} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <CardDescription>
                  Most active users by trips booked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopUsers users={res.data.topUsers}/>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
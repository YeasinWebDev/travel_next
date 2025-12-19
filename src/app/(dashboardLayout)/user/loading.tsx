import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";


export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stats Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Bookings Card */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>

        {/* Total Trips Card */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-12 mb-2" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>

        {/* Total Payments Card */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-36" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-12 w-24" />
            </div>
            <Skeleton className="h-3 w-28 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payments Over Time Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent>
            {/* Y-axis labels */}
            <div className="flex h-64">
              <div className="flex flex-col justify-between mr-4">
                {[34000, 25500, 17000, 8500, 0].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-12" />
                ))}
              </div>
              
              {/* Chart area with grid lines */}
              <div className="flex-1 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full border-t border-gray-200"></div>
                  ))}
                </div>
                
                {/* Chart bars skeleton */}
                <div className="absolute inset-0 flex items-end justify-between px-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton className="w-8 mb-2" style={{ 
                        height: `${30 + Math.random() * 50}%` 
                      }} />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* X-axis label */}
            <div className="mt-4 text-center">
              <Skeleton className="h-3 w-32 mx-auto" />
            </div>
          </CardContent>
        </Card>

        {/* Bookings Status Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-56" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Doughnut/Pie Chart Skeleton */}
              <div className="relative">
                <Skeleton className="h-48 w-48 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Skeleton className="h-8 w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 w-20 mx-auto" />
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {['Completed', 'Pending', 'Cancelled', 'Confirmed'].map((status, i) => (
                  <div key={status} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
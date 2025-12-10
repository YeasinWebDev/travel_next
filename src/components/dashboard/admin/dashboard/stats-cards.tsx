
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Users, CreditCard, Car, Calendar } from "lucide-react";

export function StatsCards({ stats }: { stats: { totalRevenue: number; totalUsers: number; totalTrips: number; totalBookings: number } }) {
  const mappedStats = [
    {
      title: "Total Revenue",
      value: `${stats.totalRevenue} bdt`,
      icon: CreditCard,
      trend: "up",
      color: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: stats.totalUsers,
      icon: Users,
      trend: "up",
      color: "bg-green-500",
    },
    {
      title: "Total Trips",
      value: stats.totalTrips,
      icon: Car,
      trend: "up",
      color: "bg-purple-500",
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      trend: "up",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mappedStats.map((stat) => (
        <Card key={stat.title} className="cursor-pointer hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.color} p-2 rounded-md`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

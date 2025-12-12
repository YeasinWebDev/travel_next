"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RevenueChart } from "../admin/dashboard/revenue-chart";

export default function AnalyticsPage(data: any) {

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

  if (!data) return <div>Loading...</div>;


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Analytics</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow">
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data?.data?.stats?.totalBookings || 0}</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data?.data?.stats?.totalTrips || 0}</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">BDT {data?.data?.stats?.totalRevenue || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center w-full gap-5">
        {/* PAYMENT LINE CHART */}
        <Card className="shadow flex-1">
          <CardHeader>
            <CardTitle>Payments Over Time</CardTitle>
          </CardHeader>
          {data?.data?.statsByMonth.length ? (
            <RevenueChart statsByMonth={data?.data?.statsByMonth} />
          ) : (
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-center text-gray-500">No payment data available</p>
            </div>
          )}
        </Card>

        {/* BOOKINGS PIE CHART */}
        <Card className="shadow flex-1">
          <CardHeader>
            <CardTitle>Bookings Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            {!data?.data?.bookingData || data?.data?.bookingData.every((item: any) => item.value === 0) ? (
              <div className="text-center text-gray-500">
                <p>No booking data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.data?.bookingData} dataKey="value" label outerRadius={100}>
                    {data?.data?.bookingData.map((entry: any, i: number) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

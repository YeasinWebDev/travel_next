// components/dashboard/user-activity-chart.tsx
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const activityData = [
  { day: 'Mon', users: 45, trips: 32 },
  { day: 'Tue', users: 52, trips: 40 },
  { day: 'Wed', users: 48, trips: 36 },
  { day: 'Thu', users: 60, trips: 48 },
  { day: 'Fri', users: 75, trips: 58 },
  { day: 'Sat', users: 65, trips: 52 },
  { day: 'Sun', users: 55, trips: 44 },
]

export function UserActivityChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'users') return [`${value}`, 'New Users']
              if (name === 'trips') return [`${value}`, 'Trips Booked']
              return value
            }}
          />
          <Bar dataKey="users" radius={[4, 4, 0, 0]}>
            {activityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#10b981" />
            ))}
          </Bar>
          <Bar dataKey="trips" radius={[4, 4, 0, 0]}>
            {activityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#3b82f6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
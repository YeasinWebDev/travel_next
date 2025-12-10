
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import { MoreVertical } from "lucide-react"

export function RecentBookings() {
  const bookings = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      trip: "Paris to London",
      date: "2024-03-15",
      amount: "$450",
      status: "completed",
      avatar: "/avatars/01.png"
    },
    {
      id: 2,
      user: "Alice Smith",
      email: "alice@example.com",
      trip: "New York to Boston",
      date: "2024-03-14",
      amount: "$320",
      status: "pending",
      avatar: "/avatars/02.png"
    },
    {
      id: 3,
      user: "Bob Johnson",
      email: "bob@example.com",
      trip: "Tokyo to Kyoto",
      date: "2024-03-13",
      amount: "$280",
      status: "completed",
      avatar: "/avatars/03.png"
    },
    {
      id: 4,
      user: "Emma Wilson",
      email: "emma@example.com",
      trip: "Sydney to Melbourne",
      date: "2024-03-12",
      amount: "$510",
      status: "cancelled",
      avatar: "/avatars/04.png"
    },
    {
      id: 5,
      user: "Michael Brown",
      email: "michael@example.com",
      trip: "Berlin to Munich",
      date: "2024-03-11",
      amount: "$390",
      status: "completed",
      avatar: "/avatars/05.png"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={booking.avatar} alt={booking.user} />
              <AvatarFallback>
                {booking.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{booking.user}</p>
              <p className="text-sm text-muted-foreground">{booking.email}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{booking.trip}</p>
            <p className="text-sm text-muted-foreground">{booking.date}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">{getStatusBadge(booking.status)}</div>
            <div className="font-medium">{booking.amount}</div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
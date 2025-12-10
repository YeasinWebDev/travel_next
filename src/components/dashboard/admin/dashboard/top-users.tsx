
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"

interface ITopUser {
  name: string
  email: string
  trips: number
  revenue: string
  progress: number
  avatar: string
}

export function TopUsers({ users }: { users: ITopUser[] }) {

  return (
    <div className="space-y-2">
      {(users || []).map((user, index) => (
        <div key={user.email} className="flex items-center border p-2 rounded-md cursor-pointer hover:bg-gray-50 ">
          <div className="flex items-center space-x-4 flex-1">
            <div className="font-medium text-lg text-muted-foreground">
              #{index + 1}
            </div>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground md:hidden">{user.email.substring(0, 10) + '...'}</p>
              <p className="text-sm text-muted-foreground hidden md:flex">{user.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{user.trips} trips</div>
            <div className="text-sm text-muted-foreground">{user.revenue} <span>৳</span></div>
          </div>
        </div>
      ))}
    </div>
  )
}
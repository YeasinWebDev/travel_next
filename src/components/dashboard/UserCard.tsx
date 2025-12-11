"use client";

import { IUser } from "@/src/types/trips.types";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/src/services/auth/logoutUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserCard({ userInfo }: { userInfo: IUser }) {
  
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50/50 rounded-lg border border-gray-200">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10 border-4 border-background">
          <AvatarImage src={userInfo.profileImage || ""} alt={userInfo.name} />
          <AvatarFallback className="text-sm bg-primary/10">{userInfo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {/* Online indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      {/* User Info - Compact */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-medium text-sm text-gray-900 truncate capitalize">{userInfo.name}</h3>
          <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 ml-2 flex-shrink-0">{userInfo.role}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
      </div>

      {/* Logout Button - Icon Only */}
      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100 flex-shrink-0" onClick={() => logoutUser()}>
        <LogOut className="h-4 w-4" />
        <span className="sr-only">Logout</span>
      </Button>
    </div>
  );
}

export default UserCard;

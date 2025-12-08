"use client";

import { getUser } from "@/src/services/auth/getme";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IUser } from "@/src/types/trips.types";
import Link from "next/link";

function DashboardBtn() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getMe = async () => {
      let res = await getUser();
      setUser(res);
    };
    getMe();
  }, []);
  if(!user) return null

  const link = user.role === "admin" ? "/admin" : "/user";

  return <div>{user ? <Link href={link} className="bg-transparent hover:bg-transparent text-black">Dashboard</Link> : null}</div>;
}

export default DashboardBtn;

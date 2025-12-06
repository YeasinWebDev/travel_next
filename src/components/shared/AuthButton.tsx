"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "@/src/services/auth/logoutUser";
import { getUser } from "@/src/services/auth/getme";
import Loading from "@/src/app/loading";
import { Spinner } from "../ui/spinner";

export default function AuthButton() {
  const [me, setMe] = useState()
  const pathname = usePathname(); 
  const [loading, setLoading] = useState(true);

  const getMe = async () =>{
    setLoading(true)
    let res = await getUser()
    setMe(res)
    setLoading(false)
  }
  useEffect(()=>{
    getMe()
  },[pathname])


   const handleLogout = async () => {
    toast.success("Logout successful");
    await logoutUser();
  };

  if(loading){
    return <Spinner className="size-10" color="black"/>
  }

  return (
    <div>
      {me ? (
        <Button onClick={handleLogout} variant="destructive" className="cursor-pointer">
          LogOut
        </Button>
      ) : (
        <Button asChild className="text-sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}

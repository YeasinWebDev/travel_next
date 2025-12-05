"use client";

import { logoutUser } from "@/src/services/auth/logoutUser";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

function LogoutBtn() {
  const handleLogout = async () => {
    toast.success("Logout successful");
    await logoutUser();
  };
  return (
    <Button onClick={handleLogout} variant="destructive" className="cursor-pointer">
      LogOut
    </Button>
  );
}

export default LogoutBtn;

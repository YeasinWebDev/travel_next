"use server";

import { redirect } from "next/navigation";
import { removeCookie } from "./tokenHandler";
import { revalidateTag } from "next/cache";

export const logoutUser = async () => {
  await removeCookie("accessToken");
  await removeCookie("refreshToken");

  revalidateTag("user","default");
  redirect("/login");
};

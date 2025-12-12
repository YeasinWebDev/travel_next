"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { removeCookie } from "../../tokenHandler";

export const logoutUser = async () => {
  await removeCookie("accessToken");
  await removeCookie("refreshToken");

  revalidateTag("user","default");
  redirect("/login");
};

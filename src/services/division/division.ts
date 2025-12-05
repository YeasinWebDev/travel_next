"use server";

import { serverFetch } from "@/src/lib/server-fetch";

export const getAllDivisions = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/division${queryString ? `?${queryString}` : ""}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message:error
    };
  }
};

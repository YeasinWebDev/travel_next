"use server"


import { serverFetch } from "@/src/lib/server-fetch";

export const getAllStats = async () => {
  try {
    const res = await serverFetch.get("/stats");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export const getAllStatsForUser = async () => {
  try {
    const res = await serverFetch.get("/stats/user");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

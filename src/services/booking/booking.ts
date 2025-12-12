"use server"

import { serverFetch } from "@/src/lib/server-fetch";

export const createBooking = async (payload: { trip: string; amount: number; numberOfGuests: number }) => {
  try {
    const response = await serverFetch.post("/booking/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await response.json();
    return res;

  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

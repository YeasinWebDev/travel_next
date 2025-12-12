"use server"

import { serverFetch } from "@/src/app/lib/server-fetch";

export const getPaymentdetails = async (paymentId: string) => {
  try {
    const res = await serverFetch.get(`/payment/${paymentId}`);

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

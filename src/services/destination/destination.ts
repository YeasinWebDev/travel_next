"use server";

import { serverFetch } from "@/src/lib/server-fetch";

export const getAllDestinations = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/destination${queryString ? `?${queryString}` : ""}`);

    const data = await response.json();

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


export const getDestinationById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/destination/${id}`);

    const data = await response.json();

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
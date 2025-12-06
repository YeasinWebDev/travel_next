"use server";

import { serverFetch } from "@/src/lib/server-fetch";

export const createTrip = async (payload: any) => {
  const newFormData = new FormData();
  newFormData.append("image", payload.image as File); 
  newFormData.append(
    "data",
    JSON.stringify({
      title: payload.title,
      destination: payload.destination,
      startDate: payload.startDate,
      endDate: payload.endDate,
      capacity: payload.capacity,
    })
  );

  try {
    const response = await serverFetch.post("/trip/create", { body: newFormData });

    const res = await response.json();

    return res;
  } catch (error) {
    console.log(error, "error");
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export const getAllTrips = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/trip${queryString ? `?${queryString}` : ""}`);

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export const getTripById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/trip/${id}`);

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

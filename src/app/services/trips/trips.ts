"use server";

import { serverFetch } from "@/src/app/lib/server-fetch";
import { TripEditValues } from "@/src/app/schema/trip.schema";
import { ITrip } from "@/src/app/types/trips.types";
import { revalidateTag } from "next/cache";

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

    revalidateTag("trip", "default");

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
    const response = await serverFetch.get(`/trip${queryString ? `?${queryString}` : ""}`, { next: { tags: ["trip"] } });

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
    const response = await serverFetch.get(`/trip/${id}`, { next: { tags: ["trip"] } });

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

export const updateTripStatus = async (id: string, status: string) => {
  try {
    const response = await serverFetch.patch(`/trip/status/${id}`, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("trip", "default");
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

export const deleteTrip = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/trip/${id}`, { next: { tags: ["trip"] } });
    revalidateTag("trip", "default");
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

export const myTrips = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/trip/my-trips${queryString ? `?${queryString}` : ""}`, { next: { tags: ["trip"] } });

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

export const updateTrip = async (id: string, payload: TripEditValues) => {
  try {
    const res = await serverFetch.patch(`/trip/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("trip", "default");
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

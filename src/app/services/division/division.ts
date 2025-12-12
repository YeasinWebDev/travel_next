"use server";

import { serverFetch } from "@/src/app/lib/server-fetch";
import { IDivision } from "@/src/app/types/division.types";
import { revalidateTag } from "next/cache";

export const createDivision = async (payload: IDivision) => {
  try {
    const response = await serverFetch.post("/division/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidateTag("division", "default");

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

export const getAllDivisions = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/division${queryString ? `?${queryString}` : ""}`, { next: { tags: ["division"] } });

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


export const updateDivision = async (id: string, payload: IDivision) => {
  try {
    const response = await serverFetch.patch(`/division/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("division", "default");
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
}

export const deleteDivision = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/division/${id}`);
    revalidateTag("division", "default");
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

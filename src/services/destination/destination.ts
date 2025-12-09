"use server";

import { serverFetch } from "@/src/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { getCookie } from "../auth/tokenHandler";

export const createDestination = async (payload: any,image:string[]) => {
  const payloadData = {...payload , image:image}
  try {
    const response = await serverFetch.post("/destination/create", {
      body:JSON.stringify(payloadData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    revalidateTag("destination", "default");
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

export const updateDestination = async (id: string, payload: any) => {
  
  try {
    const response = await serverFetch.patch(`/destination/${id}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("destination", "default");
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

export const getAllDestinations = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(`/destination${queryString ? `?${queryString}` : ""}`, { next: { tags: ["destination"] } });

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
    const response = await serverFetch.get(`/destination/${id}`, { next: { tags: ["destination"] } });

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

export const deleteDestination = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/destination/${id}`, { next: { tags: ["destination"] } });
    revalidateTag("destination", "default");
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


export const uploadImages =  async (images:FormData) =>{
   const cookie = await getCookie("accessToken");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/imageUpload`, {
      method: "POST",
      headers: {
        authorization: `${cookie?.value}`, // include Bearer if your backend expects it
        // DO NOT set 'Content-Type' here!
      },
      body: images,
    })
    const data = await res.json();
    console.log(data?.data)
    return data?.data
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: [],
      message: error
    }
  }
}
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "../../lib/server-fetch";
import { IReview } from "../../types/review.types";

export const getAllReview = async (destinationId: string) => {
  try {
    let ans = await serverFetch.get(`/review?destinationId=${destinationId}`, { next: { tags: ["review"] } });
    const data = await ans.json();
    return data?.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export const getMyReviews = async (queryString: string) => {
  try {
    let ans = await serverFetch.get(`/review/myReviews${queryString ? `?${queryString}` : ""}`, { next: { tags: ["review"] } });
    const data = await ans.json();
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

export const createReview = async (payload: Partial<IReview>) => {
  try {
    let ans = await serverFetch.post(`/review/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidateTag("review", "default");
    const data = await ans.json();
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

export const updateReview = async (id: string, payload: Partial<IReview>) => {
  try {
    let ans = await serverFetch.patch(`/review/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidateTag("review", "default");
    const data = await ans.json();
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

export const deleteReview = async (id: string) => {
  try {
    let ans = await serverFetch.delete(`/review/${id}`);

    revalidateTag("review", "default");
    const data = await ans.json();
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

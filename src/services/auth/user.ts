"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/src/lib/server-fetch";
import { ZodValidation } from "@/src/lib/zodValidation";
import z from "zod";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    location: z.string().optional(),
    profileImage: z.file().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error: "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const getAll = async (queryString: string) => {
  try {
    const res = await serverFetch.get(`/user${queryString ? `?${queryString}` : ""}`, { next: { tags: ["user"] } });
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

export const updateUserStatus = async (email: string, status: string) => {
  try {
    const res = await serverFetch.patch(`/user/status/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    revalidateTag("user", "default");
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

export const createAdmin = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const validationData = {
      name: formData.get("name"),
      location: formData.get("location"),
      email: formData.get("email"),
      profileImage: formData.get("image"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (ZodValidation(validationData, registerValidationZodSchema).success === false) {
      return ZodValidation(validationData, registerValidationZodSchema);
    }

    const validatedFields = ZodValidation(validationData, registerValidationZodSchema).data;

    if (!validatedFields) {
      return { error: "Registration failed" };
    }

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify({ ...validatedFields, role: "admin" }));
    if (validatedFields.profileImage) {
      newFormData.append("file", formData.get("image") as Blob);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
      method: "POST",
      body: newFormData,
      cache: "no-store",
    }).then((res) => res.json());

    revalidateTag("user", "default");

    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};

export const deleteUser = async (email: string) => {
  try {
    const res = await serverFetch.delete(`/user/${email}`, { next: { tags: ["user"] } });
    revalidateTag("user", "default");
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

export const updateUser = async (email: string, formData: any) => {
  try {
    const res = await serverFetch.patch(`/user/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    revalidateTag("user", "default");

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

export const myBookings = async (queryString: string) => {
  try {
    const res = await serverFetch.get(`/user/my-bookings${queryString ? `?${queryString}` : ""}`, { next: { tags: ["user"] } });

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

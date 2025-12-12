"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { ZodValidation } from "@/src/app/lib/zodValidation";

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

  

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
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

    newFormData.append("data", JSON.stringify(validatedFields));
    if (validatedFields.profileImage) {
      newFormData.append("image", formData.get("image") as Blob);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
      method: "POST",
      body: newFormData,
      cache: "no-store",
    }).then((res) => res.json());

    if (res.success) {
      await loginUser(_currentState, formData);
    }

    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};

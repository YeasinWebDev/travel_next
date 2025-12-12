"use server";

import z from "zod";
import { setCookie } from "../../app/tokenHandler";
import { ZodValidation } from "@/src/lib/zodValidation";

const loginValidationZodSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (ZodValidation(loginData, loginValidationZodSchema).success === false) {
      return ZodValidation(loginData, loginValidationZodSchema);
    }

    const validatedFields = ZodValidation(loginData, loginValidationZodSchema).data;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(validatedFields),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        tags: ["user"],
      },
    });

    const result = await res.json();

    if (result.success) {
      await setCookie("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60, // 24 hours in seconds
        sameSite: "none",
      });

      await setCookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        sameSite: "none",
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

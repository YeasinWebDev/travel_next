"use client";

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";
import { registerUser } from "../services/auth/registerUser";
import InputFieldError from "./shared/InputFieldError";
import { Eye, EyeOff } from "lucide-react"; 
import toast from "react-hot-toast";

function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isPending && state?.success) {
    toast.success("Login successful");
    setTimeout(() => {
      if (state.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (state.data.user.role === "user") {
        window.location.href = "/dashboard";
      }
    }, 800);
  } else if (!isPending && state?.message) {
    toast.error(state?.message);
  }

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            <InputFieldError field="name" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" placeholder="m@example.com" />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input id="location" name="location" type="text" placeholder="123 Main St" />
            <InputFieldError field="location" state={state} />
          </Field>

          <Field>
            <FieldLabel>Image</FieldLabel>
            <Input id="image" name="image" type="file" />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter password" className="pr-10" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <div className="relative">
              <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="pr-10" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}

export default RegisterForm;

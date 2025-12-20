"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import InputFieldError from "./shared/InputFieldError";
import Link from "next/link";
import { loginUser } from "../services/auth/loginUser";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  if (!isPending && state?.success) {
    toast.success("Login successful");
    setTimeout(() => {
      if (state.data.user.role === "admin") {
        window.location.href = "/admin";
      } else if (state.data.user.role === "user") {
        window.location.href = "/user";
      }
    }, 800);
  } else if (!isPending && state?.message) {
    toast.error(state?.message);
  }


  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              //   required
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              //   required
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
      {/* Demo Credentials */}
      <div className="mt-6 rounded-xl p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          {/* Admin Card */}
          <div className="rounded-lg border border-indigo-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Admin Demo</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Email:</span> <span className="text-gray-600">arafat@gmail.com</span>
              </p>
              <p>
                <span className="font-medium">Password:</span> <span className="text-gray-600">123456</span>
              </p>
            </div>
          </div>

          {/* User Card */}
          <div className="rounded-lg border border-pink-100 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">User Demo</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Email:</span> <span className="text-gray-600 pr-2">user@gmail.com</span>
              </p>
              <p>
                <span className="font-medium">Password:</span> <span className="text-gray-600">123456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

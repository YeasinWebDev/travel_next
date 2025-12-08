"use client";

import { useActionState } from "react";
import { loginUser } from "../services/auth/loginUser";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../components/ui/field";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import InputFieldError from "./shared/InputFieldError";
import Link from "next/link";

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
    </form>
  );
}

export default LoginForm;

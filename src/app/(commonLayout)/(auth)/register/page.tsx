import RegisterForm from "@/src/components/RegisterForm";


export const metadata = {
    title: "Register",
    description: "Create an account",
}

function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information below to create your account</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

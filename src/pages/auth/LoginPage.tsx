import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFInput } from "@/components/form/RHFInput";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
    // TODO: call your API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg border bg-card">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RHFInput<LoginFormValues>
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <RHFInput<LoginFormValues>
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

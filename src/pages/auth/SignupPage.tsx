import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFInput } from "@/components/form/RHFInput";

// Zod schema
const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof signUpSchema>;

const SignupPage = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...payload } = data;
    console.log("Confirm password:", confirmPassword);
    console.log("Register Payload:", payload);
    // TODO: call your API with payload
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg border bg-card">
        <h1 className="text-2xl font-semibold text-center mb-6">Signup</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RHFInput<RegisterFormValues>
              control={form.control}
              name="firstName"
              label="First name"
              placeholder="Enter your first name"
            />
            <RHFInput<RegisterFormValues>
              control={form.control}
              name="lastName"
              label="Last name"
              placeholder="Enter your last name"
            />
            <RHFInput<RegisterFormValues>
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <RHFInput<RegisterFormValues>
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <RHFInput<RegisterFormValues>
              control={form.control}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Enter your password again"
            />

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;

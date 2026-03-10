import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .min(3, "Min 3 characters"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .min(3, "Min 3 characters"),

    email: z.string().trim().min(1, "Email is required").email("Invalid email"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Min 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a symbol"),

    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

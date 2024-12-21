import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "E-mail is required",
    })
    .email({
      message: "Invalid E-mail",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "E-mail is required",
    })
    .email({
      message: "Invalid E-mail",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const updateProfileSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
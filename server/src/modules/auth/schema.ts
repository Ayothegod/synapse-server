import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string({ required_error: "fullname is required" })
    .min(3, "fullname must be at least 3 characters")
});
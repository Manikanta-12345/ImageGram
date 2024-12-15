import { z } from "zod";

export const zodUserSignUpSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  email: z.string().email,
});

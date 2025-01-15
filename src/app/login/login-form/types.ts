import z from "zod";
export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "username is rquired" }).trim(),
  password: z.string().min(1, { message: "password is rquired" }).trim(),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;

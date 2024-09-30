import { z } from "zod"

export const SignupValidation = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  username: z.string().min(3, { message: "Username must be at least 3 characters.", }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must at least be 8 characters' })
})
export const PostValidation = z.object({
  caption: z.string()
    .min(5, { message: 'Caption must be at least 5 characters' })
    .max(2200, { message: 'You are not allowed to write a caption more than 2200 characters' }),
  file: z.custom<File[]>(),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  tags: z.string(),
})
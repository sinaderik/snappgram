import { z } from "zod"

export const SignupValidation = z.object({
    name:z.string().min(3,{message:'Name must be at least 3 characters'}),
    username: z.string().min(3, {message: "Username must be at least 3 characters.",}),
    email:z.string().email(),
    password:z.string().min(5,{message:'Password must at least be 5 characters'})
  })
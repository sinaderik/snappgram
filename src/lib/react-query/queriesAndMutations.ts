import { INewUser } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createUserAccount, signInAccount } from "../appwrite/api"

export const useCreateUserAccount = () => {
    useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSingInAccount = () => {
    useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    })
}
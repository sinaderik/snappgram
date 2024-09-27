import { getCurrentUser } from '@/lib/appwrite/api'
import { IContexType, IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean
}
const AuthContext = createContext<IContexType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        // localStorage.getItem('cookieFallback') === null
        if (localStorage.getItem('cookieFallback') === '[]') {
            navigate('/sign-in')
        }
        
        checkAuthUser()
    }, [])

    const checkAuthUser = async () => {
        try {

            const currentAccount = await getCurrentUser();
            if (!currentAccount) throw Error
            setUser({
                id: currentAccount.$id,
                name: currentAccount.name,
                username: currentAccount.username,
                email: currentAccount.email,
                imageUrl: currentAccount.imageUrl,
                bio: currentAccount.bio,
            })
            setIsAuthenticated(true)
            return true

        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export const useUserContext = () => useContext(AuthContext)
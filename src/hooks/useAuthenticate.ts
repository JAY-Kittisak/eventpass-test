import axios from 'axios'

import { LoginData, AuthToken } from "../types"
import { useAsyncCall } from "./useAsyncCall"

interface RegisterResponse extends AuthToken {
    id: string
}

export const useAuthenticate = () => {
    // const {authState: {isUserDropdownOpen},authDispatch} = useAuthContext()
    const { loading, setLoading, error, setError } = useAsyncCall()

    const login = async (data: LoginData)  => {
        try {
            setLoading(true)

            const response = await axios.post(`https://reqres.in/api/login`,data)

            if (response.status !== 200) {
                setError('Sorry, something went wrong.')
                setLoading(false)
                return
            }

            setLoading(false)
            return response.data as AuthToken
        } catch (err) {
            const { message } = err as { message: string }

            setError(message)
            setLoading(false)
        }
    }

    const register = async (data: LoginData)  => {
        try {
            setLoading(true)

            const response = await axios.post(`https://reqres.in/api/register`,data)

            if (response.status !== 200) {
                setError('Sorry, something went wrong.')
                setLoading(false)
                return
            }

            setLoading(false)
            return response.data as RegisterResponse
        } catch (err) {
            const { message } = err as { message: string }

            setError(message)
            setLoading(false)
        }
    }

    return {
        login,
        register,
        loading,
        error
    }
}
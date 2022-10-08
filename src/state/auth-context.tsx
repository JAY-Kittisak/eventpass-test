import React, {
    ReactNode,
    Dispatch,
    SetStateAction,
    createContext,
    useState,
    useContext
} from 'react'

import { AuthToken } from '../types';

interface Props {
    children: ReactNode
}

type AuthDispatch = Dispatch<SetStateAction<AuthToken>>

const AuthStateContext = createContext<AuthToken | undefined>(undefined)
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined)

const initialState: AuthToken = { token: undefined }

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [authState, authDispatch] = useState<AuthToken>(initialState)

    return (
        <AuthStateContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={authDispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )

}

export default AuthContextProvider

export const useAuthContext = () => {
    const authState = useContext(AuthStateContext)
    const authDispatch = useContext(AuthDispatchContext)

    if (authState === undefined || authDispatch === undefined) throw new Error(
        'useAuthContext must be used within AuthContextProvider.'
    )

    return { authState, authDispatch }
}
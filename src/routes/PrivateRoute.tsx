import React, { ReactNode, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthContext } from '../state/auth-context'

interface Props {
    children: ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { authState } = useAuthContext()
    const location = useLocation();

    if (!authState.token) return <Navigate to="/" state={{ from: location }} replace/>
    return (
        <>
            {React.Children.map(children as ReactElement, (child) =>
                React.cloneElement(child)
            )}
        </>
    )
}

export default PrivateRoute
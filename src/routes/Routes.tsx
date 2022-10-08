import React from 'react'
import { Routes as Switch, Route, Navigate } from "react-router-dom"

import HomePage from '../pages/HomePage'
import ManageUsers from '../pages/ManageUsers'
import UserDetail from '../pages/UserDetail'
import PrivateRoute from './PrivateRoute'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route 
                path='/manage-users/:id' 
                element={
                    <PrivateRoute>
                        <UserDetail />
                    </PrivateRoute>
                }
            />
            <Route 
                path='/manage-users' 
                element={
                    <PrivateRoute>
                        <ManageUsers />
                    </PrivateRoute>
                    }
            />
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<Navigate to="/" replace />} />
        </Switch>
    )
}

export default Routes
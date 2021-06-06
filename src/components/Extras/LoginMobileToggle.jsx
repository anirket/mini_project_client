import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
const LoginMobileToggle = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
    if (isLoading) {
        return (
            <li className="bg-red-500 list-none p-2 "> LOADING...</li>)
    }

    return (
        <>
            {isAuthenticated ?
                (<li onClick={logout} className="bg-red-500 list-none p-2 "> LOGOUT</li>)
                :
                (<li onClick={loginWithRedirect} className="bg-red-500 list-none p-2 "> LOGIN</li>)
            }


        </>
    )
}

export default LoginMobileToggle

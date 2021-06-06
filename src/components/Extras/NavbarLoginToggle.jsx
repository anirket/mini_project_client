import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const NavbarLoginToggle = () => {
    const { isAuthenticated, loginWithRedirect, logout,isLoading } = useAuth0();
    if(isLoading){
        return(
            <button className="bg-red-500 p-3 rounded-lg mr-7 ">Loading...</button>
        )
    }

    return (
        <>
            {isAuthenticated ?
                (<button onClick={logout} className="bg-red-500 p-3 rounded-lg mr-7 ">LOGOUT</button>)
                :
                (<button onClick={loginWithRedirect} className="bg-red-500 p-3 rounded-lg mr-7 ">LOGIN</button>)
            }


        </>
    )
}

export default NavbarLoginToggle

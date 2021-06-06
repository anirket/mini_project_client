import React from 'react'
import { AiOutlineGoogle } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const LoginToggle = () => {
    const { loginWithRedirect, isAuthenticated, logout,isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="loginbuttoncomponent w-screen flex justify-center">
                <button className="loginbutton md:mt-28 mt-10 flex justify-center items-center uppercase h-12 text-white w-full rounded bg-green-500">
                        LOADING...
                </button>
            </div>
        )
    }

    return (
        <div>


            {isAuthenticated ?
                (<div className="loginbuttoncomponent w-screen flex justify-center">
                    <button onClick={logout} className="loginbutton md:mt-28 mt-10 flex justify-center items-center uppercase h-12 text-black border-2 border-black w-full rounded bg-white hover:bg-gray-300">
                        <span className="text-2xl mr-5">
                            <AiOutlineGoogle />
                        </span>
                        LOGOUT
                </button>
                </div>)
                :
                (<div className="loginbuttoncomponent w-screen flex justify-center">
                    <button onClick={loginWithRedirect} className="loginbutton md:mt-28 mt-10 flex justify-center items-center uppercase h-12 text-white w-full rounded bg-red-800 hover:bg-red-900">
                        <span className="text-2xl mr-5">
                            <AiOutlineGoogle />
                        </span>
                        Google
                </button>
                </div>)

            }

        </div>
    )
}

export default LoginToggle

import React from 'react'
import { BsFillChatDotsFill } from "react-icons/bs";
import Fade from 'react-reveal/Fade';
import LoginToggle from './Extras/LoginToggle';

const Login = () => {

    return (
        <>
            <div className="logincomponent bg-white text-gray-800 ">
                <div className="groupchatlogo flex items-center flex-col">
                    <div className="text-3xl md:text-4xl mt-24 flex items-center  justify-center ">
                        <div className="mr-5">
                            <BsFillChatDotsFill />
                        </div>
                        <div className="">
                            GROUP CHAT
                        </div>
                    </div>
                    <Fade left cascade>
                        <ul className="mt-16 text-lg md:text-xl ml-2 md:ml-0 md:mt-24">

                            <li className="p-4">-  💬 Online Live Chat Facility</li>
                            <li className="p-4">-  🧑‍🎓  Clear Your Doubts At Comfort Of Your Home</li>
                            <li className="p-4">-  👨‍🎓 Chat Rooms based on Different Subjects</li>
                        </ul>
                    </Fade>
                </div>
                <LoginToggle />

            </div>

        </>
    )
}

export default Login

import React, { useContext, useEffect } from 'react'
import { MdSend } from "react-icons/md";
import { useState } from 'react/cjs/react.development';
import { RoomnameContext } from './Contexts/RoomContext';

const Chat = () => {
    const { roomname, setroomname } = useContext(RoomnameContext);
    const [dummychats, setdummychats] = useState(["HII", "HEllo", "rbifi", "erfbgygri", "ebfuygrfy", "rbufryug"])

    useEffect(() => {
        const messagediv = document.querySelector(".chats");
        messagediv.scrollTop = messagediv.scrollHeight;

    }, [])

    return (

        <div className="chatwrapper bg-gray-200 flex justify-center items-center">
            <div className="coversationwrapper bg-white rounded-lg border-2 border-gray-400 relative">
                <div className="online div bg-green-400 p-3 rounded-t-lg font-semibold text-white  flex justify-between pr-5">

                    <h2 className="roomname">{roomname}</h2>
                    <h2>Online -<span className="pl-2">3</span></h2>
                </div>
                <div className="chats overflow-scroll pb-3">
                    {
                        dummychats.map((chats, index) => {
                            return (
                                <div key={index} className="chatmessages bg-gray-400 mt-2 rounded-tl-lg rounded-tr-lg rounded-br-lg ml-2 ">
                                    <div className="flex bg-gray-200 items-center justify-between px-2 rounded-tl-lg rounded-tr-lg text-sm py-1 font-semibold">
                                        <div>ANIKET</div>
                                        <div>12:00:19</div>
                                    </div>
                                    <div className="p-4 text-white">
                                        {chats}
                                    </div>
                                </div>
                            )
                        }

                        )
                    }
                </div>
                <form className="inputfield  absolute bottom-0 flex items-center justify-center">
                    <input placeholder="Start Typing..." className="p-3 inputfield border-2 border-gray-700 rounded-bl-lg" type="text" />
                    <button type="submit" className="bg-gray-300 p-4 border-r-2 border-b-2 border-t-2 border-gray-700 rounded-br-lg">
                        <MdSend />
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Chat

import React, { useState, useContext,useEffect } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import { RoomnameContext } from './Contexts/RoomContext';
import { Link } from 'react-router-dom'

const Room = () => {
    const { setroomname } = useContext(RoomnameContext);
    const [roomsarray, setroomsarray] = useState(["JAVASCRIPT", "PYTHON", "C++"]);

    const handledropdwonchange = (e) => {
        setroomname(e.target.value)
    }
    useEffect(() => {
     setroomname("JAVASCRIPT")
    }, [])

    return (
        <>
            <div className="wrapper flex flex-col justify-center items-center">


                <div className="dropdown relative w-full border-none outline-none mt-14">
                    <div>
                        <label className="font-semibold">Select a Room : </label>
                        <select onChange={(e) => handledropdwonchange(e)} className="cursor-pointer bg-gray-200 outline-none appearance-none  border-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full mt-3 font-semibold">
                            {
                                roomsarray.map((room, key) => <option className="" key={key} value={room}>{room}</option>)
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-14 right-0 flex items-center px-2">
                            <AiFillCaretDown />
                        </div>
                    </div>
                </div>

                <Link to="/chat">
                    <div className="joinroombutton mt-40 hover:bg-green-600 bg-green-500 text-white p-3 text-center rounded-full cursor-pointer ">
                        <button className="click focus:outline-none"> JOIN</button>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default Room

import React, { createContext, useState } from 'react'

export const RoomnameContext = createContext();

const RoomContext = (props) => {
    const [roomname, setroomname] = useState("JAVASCRIPT")
    return (
        <RoomnameContext.Provider value={{ roomname, setroomname }}>
            {props.children}
        </RoomnameContext.Provider>
    )
}

export default RoomContext

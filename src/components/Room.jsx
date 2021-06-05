import React from 'react'
import { Link } from 'react-router-dom'
const Room = () => {
    return (
    <div>
    <div className="wrapper">
        <nav>
            <ul className="logo">
                <li><Link href="" className="chat">Chat</Link></li>
            </ul>
            <ul>
                 <li> <Link className="active2" to="/home">Home</Link></li>
                <li> <Link className="active1" to="/room">Rooms</Link></li>
                <li> <Link className="active" to="/login">LogIn</Link></li>
            </ul>
        </nav>
    </div>
    <div class="text-wrapper">
        <div class="text">
            <div class="selection">
                <label for="room">Choose a Room:</label>

                <select id="room">
                <option value="Room 1">Room 1</option>
                <option value="Room 2">Room 2</option>
                <option value="Room 3">Room 3</option>
                </select>
            </div>  
        </div>
    </div>
    <div class="room">
        <button class="click" href="/room"> JOIN the Room</button>
    </div>
    </div>
    )
}

export default Room

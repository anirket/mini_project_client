import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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

            <div className="main">
                <div className="head">
                    <h1> GROUP CHAT APPLICATION </h1><br />
                    <h2>DOUBTS SOLVING VIA CHAT</h2><br /><br /><br />
                    <h5><span className="text-gray-800 font-normal">Clear Your Doubt's At Comfort Of <br />Your Home</span></h5>
                </div>
                <br /><br />
                <div className="login">
                    <button className="google" href="google">LogIn With Google+</button>
                </div>

            </div>

        </div>
    )
}

export default Login

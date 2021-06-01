import React from 'react'

const Login = () => {
    return (
        <div>
            <div className="wrapper">
                <nav>
                    <ul className="logo">
                        <li><a href="" className="chat">Chat</a></li>
                    </ul>
                    <ul>
                        <li> <a className="active2" href="#home">Home</a></li>
                        <li> <a className="active1" href="#rooms">Rooms</a></li>
                        <li> <a className="active" href="#login">LogIn</a></li>
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
                    <button className="google" href="#google">LogIn With Google+</button>
                </div>

            </div>

        </div>
    )
}

export default Login

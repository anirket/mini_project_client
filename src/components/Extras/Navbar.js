import React, { useState } from 'react'
import { BsFillChatDotsFill } from "react-icons/bs";
import { GiHamburgerMenu, GiCrossedSwords } from "react-icons/gi";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom'
import NavbarLoginToggle from './NavbarLoginToggle';
import LoginMobileToggle from './LoginMobileToggle';


const Navbar = () => {
    const [navactive, setnavactive] = useState(false);

    function togglenavbar() {
        setnavactive(!navactive)
    }


    return (
        <>

            <div className="bg-gray-500 text-white w-screen">
                <nav className="navbarwrapper flex justify-between items-center">
                    <ul className="logo ml-6">
                        <li className="md:pl-2">
                            <Link to="/" className="chat text-2xl">
                                <BsFillChatDotsFill />
                            </Link>
                        </li>
                    </ul>
                    {/* pc navbar */}
                    <ul className="navelementswrapper md:flex justify-between items-center font-semibold hidden">
                        <div className="navelements flex items-center justify-around">
                            <li> <Link className="active2" to="/">HOME</Link></li>
                            <li> <Link className="active1" to="/rooms">ROOMS</Link></li>
                        </div>
                        <NavbarLoginToggle />
                    </ul>
                    <div onClick={togglenavbar} className="text-2xl mr-8 cursor-pointer md:hidden ">
                        {navactive ? (<GiCrossedSwords />) : (<GiHamburgerMenu />)}
                    </div>
                </nav>
                {/* mobile navbar */}
            </div>
            <Fade top>
                <div className={" bg-white  text-white mobilemenu " + (navactive ? "block" : "hidden")}>
                    <div className="">
                        <Link to="/"><li onClick={()=>setnavactive(false)} className="list-none p-2  bg-gray-400  hover:bg-gray-500">Home</li></Link>
                        <Link to="/rooms"> <li  onClick={()=>setnavactive(false)} className="list-none p-2  bg-gray-400 hover:bg-gray-500"> Rooms</li></Link>
                        <LoginMobileToggle />
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default Navbar

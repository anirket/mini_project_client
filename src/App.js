import React from 'react'
import Login from './components/Login'
import Room from './components/Room'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Extras/Navbar'
import ProtectedRoute from './components/Authprotection/ProtectedRoute'
import Chat from './components/Chat'
import RoomContext from './components/Contexts/RoomContext'



const App = () => {

    return (
        <Router>
            <RoomContext>
                <div className="h-screen w-screen ">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <ProtectedRoute exact path="/rooms" component={Room} />
                        <ProtectedRoute exact path="/chat" component={Chat} />
                    </Switch>
                </div>
            </RoomContext>
        </Router>



    )
}

export default App

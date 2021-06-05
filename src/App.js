import React from 'react'
import Login from './components/Login'
import Room from './components/Room'
import './index.css'
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
const App = () => {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/room" component={Room} />
            </Switch>
        </Router>
            
      
      
    )
}

export default App

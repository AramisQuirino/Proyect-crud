import React, { Component } from 'react'
import {Route,  BrowserRouter, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Log'
import Register from './RegisterPage/RegisterPage'

export default class App extends Component{
    render(){
        return(
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

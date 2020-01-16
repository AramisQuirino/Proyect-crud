import React, { Component } from 'react'
import {Route,  BrowserRouter, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Log'
import Crud from './components/Crud'

export default class App extends Component{
    render(){
        return(
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/crud" component={Crud}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

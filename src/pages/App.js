import React, { useState } from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Route from '../RouteGuard';
import './App.css';
import Search from './search'
import LoginTab from './login';

function App() {
    document.title = "ARR Covers Repository";
    const [isPrivate, setisPrivate] = useState(true);
    const [isLogin, setisLogin] = useState(true);

    return (
        <div className="App">
            <Router > 
                <Switch>
                    <Route exact path="/"><LoginTab/></Route>
                    <Route exact path="/search" isPrivate  ><Search/></Route>
                </Switch>
            </Router>
        </div>
    )

}

export default App;

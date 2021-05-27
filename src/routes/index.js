import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import axios from 'axios';
import { apiBaseUrl } from '../config/constants';
import Logout from './pages/Logout';

function Routes(props) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    const checkAuth = () => {
        axios.get(
            apiBaseUrl + '/api/users',
            {
                withCredentials: true
            })
        .then(res => {
            setAuth(true);
        })
        .catch(error =>{ })
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0;
        checkAuth();
        // debugger;
    });

    return (
        loading ? <div className="loading">Route Loading...</div> :
        <Router>
            <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} isAuthed={auth} />} />
                <Route exact path="/register" render={(props) => <Register {...props} isAuthed={auth} />} />
                <Route exact path="/">
                    { auth ? <Main channel={props.channel}/> : <Redirect to="/login" /> }
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playground from "../components/Playground";
import axios from 'axios';
import { apiBaseUrl } from '../config/constants';

function Routes(props) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
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
    });

    return (
        loading ? <div className="loading">Loading...</div> :
        <Router>
            <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} isAuthed={auth} />} />
                <Route exact path="/register" render={(props) => <Register {...props} isAuthed={auth} />} />
                <Route exact path="/">
                    { auth ? <Playground channel={props.channel}/> : <Redirect to="/login" /> }
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
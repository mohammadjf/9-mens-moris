import React, { useEffect, useState, createContext, useContext } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import axios from 'axios';
import { apiBaseUrl } from '../config/constants';
import Logout from './pages/Logout';
import NoMatch from "./pages/404";
import {PrivateRoute, ProvideAuth} from "./pages/auth";

async function checkAuth() {
    return axios.get(
        apiBaseUrl + '/api/users',
        {
            withCredentials: true
        })
}

function Conjunction(props) {
    const [auth, setAuth] = useState(false);

    // const isAuthed = async () => {
    //     await checkAuth().then(() => {
    //         setAuth(true);
    //     }).catch(() => {
    //         setAuth(false);
    //     });
    // };
    //
    // useEffect(() => {
    //     isAuthed();
    // });

    return (
        <ProvideAuth>
        <Router>
            <Logout/>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login">
                    <Login {...props} />
                </Route>
                <Route exact path="/logout">
                    <Logout/>
                </Route>
                <PrivateRoute path="/app">
                    <Main channel={props.channel}/>
                </PrivateRoute>
                <Redirect from="/" to="/app" />
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
        </ProvideAuth>
    );
}

export default Conjunction;
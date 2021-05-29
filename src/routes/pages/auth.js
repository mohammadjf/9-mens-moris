import axios from "axios";
import {apiBaseUrl} from "../../config/constants";
import React, {createContext, useContext, useState} from "react";
import { Route, Redirect } from "react-router-dom";

function loginRequest(email, password) {
    return axios.post(apiBaseUrl + '/login', {
        email: email,
        password: password
    },{
        withCredentials: true
    })
}

function checkLogin() {
    return axios.get(apiBaseUrl + '/api/users',{
        withCredentials: true
    });
}

function logoutReq() {
    return axios.post(apiBaseUrl + '/logout',{},{
        withCredentials: true
    })
}

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    checkLogin().then(() => {
        setUser(true);
    }).catch(() => {
        setUser(false);
    });

    const signin = (email, password, cb, ecb)=> {
        loginRequest(email, password).then(res => {
            localStorage.setItem('userId', res.data.user);
            cb();
            setUser(true);
        }).catch(err => {
            ecb(err.response.data);
        });
    };

    const signout = cb => {
        logoutReq().then(res => {
            cb();
            setUser(false);
        }).catch(err => { console.log(err) });
    };

    return {
        user,
        signin,
        signout
    };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user === null ? <div>Loading</div> : (
                    auth.user ? children :
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
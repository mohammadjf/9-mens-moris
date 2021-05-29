import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";
import { useAuth } from "./auth";
import { Link, Redirect, useHistory, withRouter, useLocation } from "react-router-dom";


function Login(props) {
    /**
     * Hooks
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    let location = useLocation();
    /** */

    const history = useHistory();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/app" } };
    let loginOpt = () => {
        auth.signin(email, password, () => {
            history.replace(from);
        }, err => {
            console.log(err.error);
            setError(err.error);
        });
    };

    return (
        auth.user ? <Redirect to="/app" /> :
        <div className="container">
            <div className="login_panel">
                {error ? <div className="error">{ error }</div> : ""}
                <h3>Login</h3>
                <input placeholder="Your Email..." onChange={(e) => {
                    setEmail(e.target.value);
                }} value={email}/>
                <input placeholder="Your Password..." type="password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button onClick={loginOpt}> Go!</button>
                <Link to="/register"> Register </Link>
            </div>
        </div>
    );
}

export default withRouter(Login);
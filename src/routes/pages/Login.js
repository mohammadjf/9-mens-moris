import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";
import axios from "axios";
import { apiBaseUrl } from "../../config/constants";
import { Link, Redirect, useHistory } from "react-router-dom";

function Login(props) {

    /**
     * Hooks
     */
    const [email, setEmail] = useState(props.location.state ? props.location.state.email : "");
    const [password, setPassword] = useState(props.location.state ? props.location.state.password : "");
    const [isLoading, setIsLoading] = useState(false);
    const [loginTry, setLoginTry] = useState(0);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const history = useHistory();

    /** */

    const register = () => {
        setIsLoading(true);
        axios.post(apiBaseUrl + '/login', {
                email: email,
                password: password
            },{
                withCredentials: true
            })
            .then(response => {
                localStorage.setItem('userId', response.data.user);
                setLoginSuccess(true);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // if request is redirected from register page.
        if(props.location.state && props.location.state.email && props.location.state.password && loginTry === 0) {
            setLoginTry(loginTry + 1);
        }
    });

    useEffect(() => {
        if(props.location.state && email && password && loginTry === 0) {
            register();
        }
    },[loginTry]);

    return (
        <div className="container">
            {isLoading ? <div> Login Loading . . . </div> :
                <div className="login_panel">
                    <h3>Login</h3>
                    <input placeholder="Your Email..." onChange={(e) => {
                        setEmail(e.target.value);
                    }} value={email}/>
                    <input placeholder="Your Password..." type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    <button onClick={register}> Go!</button>
                    <Link to="/register"> Register </Link>
                    { props.isAuthed ? <Redirect to="/" /> : "" }
                </div>
            }
            { loginSuccess ? <Redirect to="/" /> : "" }
        </div>
    );
}

export default Login;
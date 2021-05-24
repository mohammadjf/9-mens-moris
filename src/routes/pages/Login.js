import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";
import axios from "axios";
import { apiBaseUrl } from "../../config/constants";

function Login(props) {

    const [email, setEmail] = useState(props.location.state ? props.location.state.email : "");
    const [password, setPassword] = useState(props.location.state ? props.location.state.password : "");
    const [isLoading, setIsLoading] = useState(false);
    const [loginTry, setLoginTry] = useState(0);

    const register = () => {
        setIsLoading(true);
        axios.post(apiBaseUrl + '/login', {
                email: email,
                password: password
            })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
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
            {isLoading ? <div> Loading . . . </div> :
                <div className="login_panel">
                    <h3>Login</h3>
                    <input placeholder="Your Email..." onChange={(e) => {
                        setEmail(e.target.value);
                    }} value={email}/>
                    <input placeholder="Your Password..." type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    <button onClick={register}> Go!</button>
                </div>
            }
        </div>
    );
}

export default Login;
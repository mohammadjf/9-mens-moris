import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";
import axios from "axios";
import { apiBaseUrl } from "../../config/constants";

function Login() {

    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const register = () => {
        setIsLoading(true);
        axios.post(apiBaseUrl + '/login', {
                email: email,
                password: password
            })
            .then(response => {
                console.log(response.data);
                //this.$emit('user-authenticated', userUri);
                //this.email = '';
                //this.password = '';
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <div className="container">
            {isLoading ? <div> Loading . . . </div> :
                <div className="login_panel">
                    <h3>Dooz</h3>
                    <input placeholder="Your Email..." onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
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
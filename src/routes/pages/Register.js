import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";
import axios from "axios";
import { apiBaseUrl } from "../../config/constants";
import { Redirect, useHistory, Link } from 'react-router-dom';
import {useAuth} from "./auth";

function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(false);
    const [repassword, setRePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMgs, setError] = useState([]);
    const [status, setStatus] = useState(false);

    const history = useHistory();
    let auth = useAuth();

    const register = () => {
        if(!password || password != repassword) {
            alert("Password not match!");
            return false;
        }

        setIsLoading(true);

        axios.post(apiBaseUrl + '/api/users', {
                email: email,
                password: password
            })
            .then(response => {
                setStatus(true);
            }).catch(error => {
                if(error.response && error.response.data.violations) {
                    setError(error.response.data.violations);
                } else {
                    setError([{message: "An error occurred."}]);
                }
            }).finally(() => {
                setIsLoading(false);
            })
    };

    return (
        auth.user ? <Redirect to="/app" /> : <div className="container">
            {isLoading ? <div> Loading . . . </div> :
                <div className="login_panel">
                    <h3>Register</h3>
                    { errorMgs.map(
                        (item, index) => <div key={index} className="error">{ item.propertyPath + ': ' +item.message }</div>
                    ) }
                    <input placeholder="Your Email..." onChange={(e) => {
                        setEmail(e.target.value);
                    }} value={email}/>
                    <input placeholder="Your Password..." type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <input placeholder="Repeat Password..." type="password" onChange={(e) => {
                        setRePassword(e.target.value);
                    }}/>
                    <button onClick={register}> Register </button>
                    Have an account? <Link to="/login"> Login </Link>
                    {status ? <Redirect to={{
                        pathname:"/login",
                        state:{email: email, password: password} 
                    }}/> : ""}
                </div>
            }
        </div>
    );
}

export default Register;
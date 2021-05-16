import React, { Fragment, useState, useEffect } from 'react';
import "../../style/Login.css";

function Login() {

    const [name, setName] = useState(false);

    const register = () => {
        localStorage.setItem('name', name);
    };

    return (
        <div className="container">
            <input placeholder="Your Name..." onChange={(e) => {
                setName(e.target.value);
            }}/>
            <button onClick={register}> Go! </button>
        </div>
    );
}

export default Login;
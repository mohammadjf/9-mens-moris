import React, {useEffect, useState} from "react";
import axios from "axios";
import { apiBaseUrl } from "../../config/constants";
import { Redirect, useHistory } from 'react-router-dom';

function Logout(prpos) {
    const [loggedOut, setLoggedOut] = useState(false);
    
    const logout = () => {
        axios.post(apiBaseUrl + '/logout',{},{
            withCredentials: true
        })
        .then(res => {
            localStorage.removeItem("userId");
            setLoggedOut(true);
        })
    }

    return (
        loggedOut ? <Redirect to="/" /> : <button onClick={logout} >Logout</button>
    );
}

export default Logout;
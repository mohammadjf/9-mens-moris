import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Playground from '../../components/Playground';
import { apiBaseUrl } from '../../config/constants';
import { Link, useHistory, withRouter } from 'react-router-dom';

function Main(props) {
    
    const [userId, setUserId] = useState(localStorage.getItem('userId') | false);
    const [user, setUser] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(userId && !user) {
            axios.get(apiBaseUrl + '/api/users/' + userId, {withCredentials: true})
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                history.push("/login");
            });
        }
    });

    return (
        <>
            <div className="user-info">
                {user ? user.email : ""}
            </div>
            <Playground {...props} userId={userId}/>
        </>    
    );
}

export default withRouter(Main);
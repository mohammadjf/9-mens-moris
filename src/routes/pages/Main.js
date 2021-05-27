import { useEffect, useState } from 'react';
import axios from 'axios';
import Playground from '../../components/Playground';
import { apiBaseUrl } from '../../config/constants';
import { Link, useHistory } from 'react-router-dom';
import Logout from './Logout';

function Main(props) {
    
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [user, setUser] = useState();

    const history = useHistory();

    useEffect(() => {
        if(userId && !user) {
            axios.get(apiBaseUrl + '/api/users/' + userId, {withCredentials: true})
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
        } else {
            history.push('/');
        }
    });

    return (
        <>
            <div className="user-info">
                {user ? user.email : ""} - <Logout />
            </div>
            <Playground {...props}/>
        </>    
    );
}

export default Main;
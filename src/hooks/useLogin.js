import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {logIn} from '../actions';

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState();
    const dispatch = useDispatch();

    function submitLogin(event) {
        event.preventDefault();
        if (username !== '' && password !== '') {
            axios
                .post(`
                /login`,
                    {username, password,}
                )
                .then(response => {
                    if (response.data.token !== undefined) {
                        dispatch(logIn(username, response.data.token, response.data.role));
                    } else {
                        setMessage(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                });
        } else {
            setMessage('All the input fields are required.');
        }
    }

    return [username, setUsername, setPassword, message, submitLogin];
}
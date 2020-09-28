import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {logIn} from '../actions';

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
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
                        dispatch(logIn(username, response.data.token));
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch(errorResp => {
                    setError(errorResp.message);
                });
        } else {
            setError('All the input fields are required.');
        }
    }

    return [username, setUsername, setPassword, error, submitLogin];
}
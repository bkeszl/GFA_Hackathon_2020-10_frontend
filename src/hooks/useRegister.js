import axios from 'axios';
import {useState} from 'react';

export default function () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    function submitRegister(event) {
        event.preventDefault();
        setMessage('');
        if ((username !== '' && email !== ''&& password !== '')) {
            setMessage('All the input fields are required. ');
        }
        if (email.includes('@') && email.includes('.') && email.length < 6) {
            setMessage(message + "Email is not valid. ");
        }
        if (password !== confirmPassword) {
            setMessage(message + "The password doesn't match. ");
        }
        if (message === '') {
            axios
                .post(`
                /register`,
                    {username, email, password,}
                )
                .then(response => {
                    if (!!response.data.id &&
                        !!response.data.username &&
                        !!response.data.email &&
                        !!response.data.verified &&
                        !!response.data.avatar) {
                        setMessage("Registration was succesful.")
                    } else {
                        setMessage(response.data.message);
                    }
                })
                .catch(errorResp => {
                    setMessage(errorResp.message);
                });
        } else {
            setMessage('All the input fields are required.');
        }
    }

    return [setUsername, setEmail, setPassword, setConfirmPassword, message, submitRegister];
}
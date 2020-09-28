const auth = {
    username: '',
    token: '',
    isLoggedIn: false,
};

export default function authReducer(state = auth, action) {
    switch (action.type) {
        case 'LOG_IN':
            return {
                username: action.username,
                token: action.token,
                isLoggedIn: true,
            };
        case 'LOG_OUT':
            return {
                username: '',
                isLoggedIn: false,
                token: '',
            };
        default:
            return {
                username: '',
                token: '',
                isLoggedIn: false,
            };
    }
}

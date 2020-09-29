const auth = {
    username: '',
    token: '',
    role: '',
    isLoggedIn: false,
};

export default function authReducer(state = auth, action) {
    switch (action.type) {
        case 'LOG_IN':
            return {
                username: action.username,
                token: action.token,
                role: action.role,
                isLoggedIn: true,
            };
        case 'LOG_OUT':
            return {
                username: '',
                token: '',
                role: '',
                isLoggedIn: false,
            };
        default:
            return {
                username: '',
                token: '',
                role: '',
                isLoggedIn: false,
            };
    }
}

export const logIn = (
    username,
    token,
    role
) => {
    return {
        type: 'LOG_IN',
        username,
        token,
        role,
        isLoggedIn: true,
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT',
        username: '',
        token: '',
        role: '',
        isLoggedIn: false,
    };
};

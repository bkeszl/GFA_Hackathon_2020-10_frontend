export const logIn = (
    username,
    token,
) => {
    return {
        type: 'LOG_IN',
        username,
        token,
        isLoggedIn: true,
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT',
        username: '',
        token: '',
        isLoggedIn: false,
    };
};

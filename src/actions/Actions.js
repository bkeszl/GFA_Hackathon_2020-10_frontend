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

export const getNeedyLocation = (
  lat,
  lng
) => {
  return {
      type: 'GET_NEEDY_LOCATION',
      lat,
      lng
  };
};

export const clearNeedyLocation = () => {
  return {
      type: 'CLEAR_NEEDY_LOCATION',
      lat: undefined,
      lng: undefined
  };
};
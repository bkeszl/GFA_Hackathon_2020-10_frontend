const redux = {
  username: "",
  token: "",
  role: "",
  isLoggedIn: false,
  lat: undefined,
  lng: undefined,
};

export default function reduxReducer(state = redux, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        username: action.username,
        token: action.token,
        role: action.role,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        username: "",
        token: "",
        role: "",
        isLoggedIn: false,
      };
    case "GET_NEEDY_LOCATION":
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
      };
    case "CLEAR_NEEDY_LOCATION":
      return {
        ...state,
        lat: undefined,
        lng: undefined,
      };
    default:
      return {
        username: "",
        token: "",
        role: "",
        isLoggedIn: false,
      };
  }
}
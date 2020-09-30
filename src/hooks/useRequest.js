import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {logOut} from "../actions";

export default () => {
    const authFromRedux = useSelector(state => state.auth);
    const dispatch = useDispatch();
    function requestWithToken(method, endPoint, data) {
        if (authFromRedux.isLoggedIn) {
            if (method === 'GET') {
                data = null;
            }
            return axios({
                method,
                url: endPoint,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authFromRedux.token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data,
            })
                .then(response => response.data)
                .catch(() => dispatch(logOut()));
        }
        return undefined;
    }

    return [requestWithToken];
}
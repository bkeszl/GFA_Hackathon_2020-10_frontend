import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {logOut} from "../actions";

export default () => {
    const authFromRedux = useSelector(state => state.redux);
    const dispatch = useDispatch();
    function requestWithToken(method, endPoint, data) {
        if (authFromRedux.isLoggedIn) {
            if (method === 'GET') {
                data = null;
            }
            return axios({
                method,
                url: 'http://hackathonbackend2-env.eba-sh3hk2ci.eu-central-1.elasticbeanstalk.com'+endPoint,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authFromRedux.token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data,
            })
                .then(response => response.data)
                .catch(() => {
                    //dispatch(logOut())
                });
        }
        return undefined;
    }

    return [requestWithToken];
}
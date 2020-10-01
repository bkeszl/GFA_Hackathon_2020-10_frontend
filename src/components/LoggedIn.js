import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions";
import Needy from "./Needy";
import Volunteer from "./Volunteer";

export default function () {
    const dispatch = useDispatch();
    const userFromRedux = useSelector(state => state.redux);
    return (
        <>
            <button className={"floatRight"} onClick={() => dispatch(logOut())}>logout</button>
            {(userFromRedux.role === 'ROLE_VOLUNTEER') ? <Volunteer /> : null}
            {(userFromRedux.role === 'ROLE_NEEDY') ? <Needy/> : null}
        </>
    );
}
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions";
import Needy from "./Needy";

export default function() {
    const dispatch = useDispatch();
    const userFromRedux = useSelector(state => state.redux);
    return (
        <>
            <h1>LizarDOS - help the needy</h1>
            <button onClick={() => dispatch(logOut())}>logout</button>
            {(userFromRedux.role === 'ROLE_VOLUNTEER') ? <h2>volunteer</h2> :null}
            {(userFromRedux.role === 'ROLE_NEEDY') ? <Needy /> :null}
            </>
    );
}
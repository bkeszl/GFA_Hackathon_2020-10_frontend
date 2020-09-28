import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import useRequest from "../hooks/useRequest";
import CohortSingleton from './CohortSingleton';
import {logOut} from "../actions";

export default function (props) {
    const [requestWithToken] = useRequest();
    const [cohortsList, setCohortsList] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const authFromRedux = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        requestWithToken("GET", "/cohorts", {})
            .then(response => setCohortsList(response.cohorts))
    }, [selectedValue]);

    return (
        <>
            <select
                name="cohorts"
                id="cohorts"
                placeholder="Select Option"
                onChange={(event) => {
                    setSelectedValue(event.target.value);
                }}
            >
                <option value="">Select a cohort!</option>
                {cohortsList.map((cohort) => (
                    <option key={cohort.cohort_id} value={cohort.cohort_id}>{cohort.cohort_name}</option>
                ))}
            </select>
            {selectedValue ? <button onClick={async () => {
                let req = await fetch('/cohort/download-links', {
                    method: "POST",
                    body: JSON.stringify({"cohort_id": selectedValue}),
                    headers: {
                        'Authorization': 'Bearer ' + authFromRedux.token,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    }

                })
                console.log(req);
            }}>send_emails!</button> : null}
            <button onClick={() => dispatch(logOut())}>logout</button>
            {selectedValue ? <CohortSingleton id={selectedValue}/> : null}
        </>
    );
}

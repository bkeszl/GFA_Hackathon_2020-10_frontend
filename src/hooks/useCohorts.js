import React from "react";
import useRequest from "./useRequest";

export default function () {
    const [requestWithToken] = useRequest();

    function getCohortList() {
        return requestWithToken("GET", "/cohorts", {});
    }

    return [getCohortList()];
}
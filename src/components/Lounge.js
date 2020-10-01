import React from "react";
import Login from "./Login";
import Register from "./Register";

export default () => {
    return (
        <>

            <div className={"wrapper"}>
                <div className={"fifty"}>
                    <p>coviDelivery is connecting people in need of help with volunteers from their local areas. Register as a
                        volunteer if you would like to contribute to your community in a meaningful way. If there is something
                        that you require assistance with, register as a person in need and we will do our best to match you with
                        the help you need.</p>
                </div>
            </div>
            <div className={"wrapper"}>
                <Login/>
                <Register/>
            </div>
        </>
    );
}
import React from "react";
import WrappedMap from "./WrappedMap";

export default (props) => {

    return (
        <div style={{ width: '100vh', height: '100vh' }} className="">
            <WrappedMap
                loacation={props.location}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    );
}
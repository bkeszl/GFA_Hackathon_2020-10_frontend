import {withGoogleMap, withScriptjs} from "react-google-maps";
import InnerMap from "./InnerMap";
import React from "react";

export default (props) => {
    let MyMap = withScriptjs(withGoogleMap(InnerMap(props)));
    return (
        <div style={{width: '100vh', height: '100vh'}} className="">
            <MyMap
                loacation={props.location}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: '100%'}}/>}
                containerElement={<div style={{height: '100%'}}/>}
                mapElement={<div style={{height: '100%'}}/>}
            />
        </div>
    );
}

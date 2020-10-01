import React, { useState, useEffect } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import useRequest from "../hooks/useRequest"
import { compose, withProps, withStateHandlers } from "recompose";
const Map = compose(
    withStateHandlers(
        () => ({
            selectedMarker: null,
        }),
        {
            setSelectedMarker: ({ selectedMarker }) => (id) => ({
                selectedMarker: id,
            }),
        }
    ),
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className={"Map marginbottom"} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 47.497913, lng: 19.040236 }}>
        {props.tasks.map((task, id) => (
            <Marker
                onClick={() => {
                    props.setSelectedMarker(id);
                }}
                position={{ lat: task.location.y, lng: task.location.x }}
            >
                {props.selectedMarker === id ? (
                    <InfoWindow req={props.req}
                                onCloseClick={() => {
                                    props.setSelectedMarker(null);
                                }}
                    >
            <div className={"infoInner"}>
              <h3>
                {task.name}
              </h3>
                <p className={"lead"}>{task.sender.username} - {task.sender.email}</p>
              <p className={"lead"}>{task.description}</p>
              <p>{task.location.address}</p>
              <button className="infoWindowButton" onClick={()=>{
                  props.req("POST", "/volunteer/task", { taskId:task.id }).then(()=>{
                      window.location.reload();
                  })
              }}>Apply</button>
            </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        ))}
    </GoogleMap>
));
function VolunteerMap(props) {
    const [requestWithToken] = useRequest();
    return (
        <>
            <Map isMarkerShown tasks={props.tasks} req={requestWithToken}></Map>
        </>
    );
}
export default VolunteerMap;
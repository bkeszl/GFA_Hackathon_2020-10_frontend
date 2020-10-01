import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import {
  getNeedyLocation,
  clearNeedyLocation,
} from "../actions";
import { useDispatch } from "react-redux";

function Map(props) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState({});
  const dispatch = useDispatch();
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: props.location.lat ? props.location.lat : 0,
        lng: props.location.lng ? props.location.lng : 0,
      }}
      onClick={(event) => {
        dispatch(getNeedyLocation(event.latLng.lat(), event.latLng.lng()));
        setSelectedCoordinate({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }}
    >
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.x,
            lng: selectedMarker.y,
          }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
            <h2>{selectedMarker.title}</h2>
            <p>{selectedMarker.info}</p>
          </div>
        </InfoWindow>
      )}
      {selectedCoordinate && (
        <Marker
          position={{
            lat: selectedCoordinate.lat,
            lng: selectedCoordinate.lng,
          }}
        />
      )}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default (props) => {
 
  return (
    <div className="Map fifty">
      <WrappedMap location={props.location}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
};

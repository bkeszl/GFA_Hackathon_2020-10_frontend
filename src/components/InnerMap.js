import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";

export default (props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState([]);
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{
                lat: 0,
                lng: 0
            }}
            onClick={(event) => {setSelectedCoordinate(current => [...current, {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }])}}
        >
            {selectedMarker && (
                <InfoWindow
                    position={{
                        lat: selectedMarker.x,
                        lng: selectedMarker.y
                    }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                    }}>
                    <div>
                        <h2>{selectedMarker.title}</h2>
                        <p>{selectedMarker.info}</p>
                    </div>
                </InfoWindow>
            )}
            {selectedCoordinate.map((coor) => (
                <Marker
                    key={coor.lat}
                    position={{
                        lat: coor.lat,
                        lng: coor.lng
                    }}
                />
            ))}
        </GoogleMap>
    );
}
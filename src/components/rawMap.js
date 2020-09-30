import React, { useState } from 'react';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as data from './data/data.json'
import mapStyles from "./mapStyles"

function Map() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState([]);
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{
                lat: 0,
                lng: 0
            }}
            defaultOptions={{ styles: mapStyles }}
            onClick={(event) => {setSelectedCoordinate(current => [...current, {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }])}}
        >
            {data.markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={{
                        lat: marker.x,
                        lng: marker.y
                    }}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url: '/coronavirus.svg',
                        scaledSize: new window.google.maps.Size(50, 50)
                    }} />
            ))}
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
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default () => {
    const [userLocation, setUserLocation] = useState();
    const [userAddress, setUserAddress] = useState();
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    const getCoordinates = (position) => {
        console.log(position);
        setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }
    const reverseGeocodeCoordinates = () => {
        fetch(`https://us1.locationiq.com/v1/reverse.php?key=fc48b0dd35c2c8&format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}`)
            .then(response => response.json())
            .then(data => setUserAddress(data.display_name))
            .catch(error => alert(error))
    }
    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
        }
    }
    return (
        <div style={{ width: '100vh', height: '100vh' }} className="App">
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
            <button onClick={getLocation}>Get coordinates</button>
            <button onClick={() => console.log(userLocation)}>show userLocation</button>
            <button onClick={() => reverseGeocodeCoordinates()}>get address</button>
        </div>
    );
}
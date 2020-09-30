import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { useSelector } from "react-redux";
import useNeedy from "../hooks/useNeedy";
import RawMap from "./RawMap";

export default function () {
  const [requestWithToken] = useRequest();
  const [tasks, setTasks] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [location, setLocation] = useState({});
  const [
    setName,
    setCategoryType,
    setDescription,
    setFromDate,
    setToDate,
    volunteers,
    setVolunteers,
    submitAddTask,
    setVolunteersFromTasks,
  ] = useNeedy();
  const userFromRedux = useSelector((state) => state.redux);

  useEffect(() => {
    requestWithToken("GET", "/my-tasks").then((response) => {
      console.log(response);
      setTasks(response.taskList);
      setVolunteers(setVolunteersFromTasks(response.taskList));
    });
  }, []);

  useEffect(() => {
    setLocation({ lat: userFromRedux.lat, lng: userFromRedux.lng });
  }, [userFromRedux]);

  function convertToDate(timestamp) {
    let date = new Date(timestamp);
    return (
      date.getFullYear() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes()
    );
  }
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const getCoordinates = (position) => {
    console.log(position);
    console.log(position.coords.latitude)
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const reverseGeocodeCoordinates = () => {
    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=fc48b0dd35c2c8&format=json&lat=${location.latitude}&lon=${location.longitude}`
    )
      .then((response) => response.json())
      .then((data) => setUserAddress(data.display_name))
      .catch((error) => alert(error));
  };
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <RawMap location={location} />
      <div className="small-form">
        <h2>Make a new task</h2>
        <form
          onSubmit={(event) => {
            alert("Form sent in!");
            submitAddTask();
          }}
        >
          <input
            name="name"
            placeholder="title"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <select
            name="categoryType"
            id="categoryType"
            placeholder="Select category"
            onChange={(event) => {
              setCategoryType(event.target.value);
            }}
          >
            <option value="FOOD" key="FOOD">
              FOOD
            </option>
            <option value="DIY" key="DIY">
              DIY
            </option>
            <option value="HOUSEHOLD" key="HOUSEHOLD">
              HOUSEHOLD
            </option>
            <option value="OTHER" key="OTHER">
              FOOD
            </option>
          </select>
          <textarea
            name="description"
            rows="4"
            cols="30"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <input
            name="fromDate"
            type="datetime-local"
            onChange={(event) => {
              setFromDate(event.target.value);
            }}
          />
          <input
            name="toDate"
            type="datetime-local"
            onChange={(event) => {
              setToDate(event.target.value);
            }}
          />
          <button onClick={(event) => {
            event.preventDefault();
            getLocation();
          }}>Use my location</button>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div>
        <h2>My tasks</h2>
        {tasks.map((task) => (
          <div key={task.id}>
            <h3>
              {task.name} - {task.status}
            </h3>
            <h4>
              {task.categoryType}
              <br />
              {task.sender.username} - {task.sender.email}
              <br />
              {convertToDate(task.fromDate)} - {convertToDate(task.toDate)}
            </h4>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Give Feedbacks</h2>
        {volunteers.map((volunteer) => (
          <div key={volunteer.id}>
            <h3>{volunteer.username}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

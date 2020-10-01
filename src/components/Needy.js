import React, {useEffect, useState} from "react";
import useRequest from "../hooks/useRequest";
import {useSelector} from "react-redux";
import useNeedy from "../hooks/useNeedy";
import RawMap from "./RawMap";

export default function () {
    const [requestWithToken] = useRequest();
    const [tasks, setTasks] = useState([]);
    const [userAddress, setUserAddress] = useState();

    const [
        setName,
        setCategoryType,
        setDescription,
        setFromDate, setToDate,
        volunteers, setVolunteers,
        submitAddTask,
        setVolunteersFromTasks,
        submitFeedback,
        receiverId, setReceiverId,
        message, setMessage,
        rating, setRating,
        newTaskMessage, feedbackMessage, location, setLocation
    ] = useNeedy();
    const userFromRedux = useSelector((state) => state.redux);

    useEffect(() => {
        requestWithToken("GET", "/my-tasks").then((response) => {
            console.log(response);
            setTasks(response.taskList);
            setVolunteers(setVolunteersFromTasks(response.taskList));
        });
    }, [newTaskMessage]);

    useEffect(() => {
        setLocation({lat: userFromRedux.lat, lng: userFromRedux.lng});
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
            <div className={"wrapper"}>
                <div className={"fifty"}>
                    <div className="small-form">
                        <h2>Make a new task</h2>
                        <p>{newTaskMessage ? newTaskMessage : null}</p>
                        <form
                            onSubmit={(event) => {
                                submitAddTask(event);
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
                            }}>Use my location
                            </button>
                            <button type="submit">Create a new task</button>
                        </form>
                    </div>
                </div>
                <RawMap location={location}/>
            </div>
            <div className={"wrapper"}>
                <h2>My tasks</h2>
                {tasks.map((task) => (
                    <div key={task.id} className={"task " + task.status}>
                        <h3>{task.name}</h3>
                        <p class={"lead"}>
                            {task.status} - {task.categoryType}
                            <br/>
                            {task.applier ? (task.applier.username + ' - ' + task.applier.email) : null}
                            <br/>
                            {convertToDate(task.fromDate)} - {convertToDate(task.toDate)}
                        </p>
                        <p className={"description"}>{task.description}</p>
                    </div>
                ))}
                <div>
                </div>
            </div>
            <div className={"wrapper"}>
                <h2>Give Feedbacks</h2>
                <p>{feedbackMessage ? feedbackMessage : null}</p>

                <form
                            onSubmit={(event) => {
                                submitFeedback(event);
                            }}
                        >
                            <select
                                name="recieverId"
                                id="recieverId"
                                placeholder="Select volunteer"
                                onChange={(event) => {
                                    setReceiverId(event.target.value);
                                }}
                            >
                            {volunteers.map((volunteer) => (
                                <option key={volunteer.id} value={volunteer.id} className={"task feedback"}>
                                    {volunteer.username}
                                </option>
                            ))}
                            </select>
                            <input
                                name="message"
                                placeholder="message"
                                type="text"
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                            />
                            <select
                                name="rating"
                                id="rating"
                                placeholder="Select rating"
                                onChange={(event) => {
                                    setRating(event.target.value);
                                }}
                            >
                                <option value="5" key="5">
                                    &#9733;&#9733;&#9733;&#9733;&#9733;
                                </option>
                                <option value="4" key="4">
                                    &#9733;&#9733;&#9733;&#9733;
                                </option>
                                <option value="3" key="3">
                                    &#9733;&#9733;&#9733;
                                </option>
                                <option value="2" key="2">
                                    &#9733;&#9733;
                                </option>
                                <option value="1" key="1">
                                    &#9733;
                                </option>
                            </select>
                            <button type="submit">Add feedback</button>
                        </form>
            </div>
        </>
    );
}

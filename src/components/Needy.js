import React, {useEffect, useState} from "react";
import useRequest from "../hooks/useRequest";
import useNeedy from "../hooks/useNeedy";
import RawMap from "./RawMap"

export default function () {

    const [requestWithToken] = useRequest();
    const [tasks, setTasks] = useState([]);
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
        setVolunteersFromTasks] = useNeedy();

    useEffect(() => {
        requestWithToken("GET", "/my-tasks")
            .then(response => {
                console.log(response);
                setTasks(response.taskList);
                setVolunteers(setVolunteersFromTasks(response.taskList));
            })
    }, []);

    function convertToDate(timestamp) {
        let date = new Date(timestamp);
        return date.getFullYear() + "." + (date.getMonth() + 1)
            + "." + date.getDate() + " " + date.getHours() + ":"
            + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    }

    return (
        <>
            <RawMap/>
            <div className="small-form">
                <h2>Make a new task</h2>
                <form onSubmit={(event) => {
                    alert('sdfdssfd');
                    submitAddTask();
                }}>
                    <input
                        name="name"
                        placeholder="title"
                        type="text"
                        onChange={event => {
                            setName(event.target.value);
                        }}
                    />
                    <select
                        name="categoryType"
                        id="categoryType"
                        placeholder="Select category"
                        onChange={event => {
                            setCategoryType(event.target.value);
                        }}
                    >
                        <option value="FOOD" key="FOOD">FOOD</option>
                        <option value="DIY" key="DIY">DIY</option>
                        <option value="HOUSEHOLD" key="HOUSEHOLD">HOUSEHOLD</option>
                        <option value="OTHER" key="OTHER">FOOD</option>
                    </select>
                    <textarea
                        name="description"
                        rows="4"
                        cols="30"
                        onChange={event => {
                            setDescription(event.target.value);
                        }}
                    >
                    </textarea>
                    <input
                        name="fromDate"
                        type="datetime-local"
                        onChange={event => {
                            setFromDate(event.target.value);
                        }}
                    />
                    <input
                        name="toDate"
                        type="datetime-local"
                        onChange={event => {
                            setToDate(event.target.value);
                        }}
                    />
                    <button type="submit">Sign in</button>
                </form>
            </div>
            <div>
                <h2>My tasks</h2>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.name} - {task.status}</h3>
                        <h4>{task.categoryType}<br/>
                            {task.sender.username} - {task.sender.email}<br/>
                            {convertToDate(task.fromDate)} - {convertToDate(task.toDate)}</h4>
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


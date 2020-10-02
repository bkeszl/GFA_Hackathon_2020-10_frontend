import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import VolunteerMap from "./VolunteerMap";
export default function () {
    const [requestWithToken] = useRequest();
    const [tasks, setTasks] = useState([]);
    const [volunteersOwnTasks, setVolunteersOwnTasks] = useState([]);
    const [location, setLocation] = useState({ lat: 47.507440, lng: 19.066140 });
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        requestWithToken(
            "GET",
            "/volunteer/tasks?lat=" + location.lat + "&lng=" + location.lng
        ).then((response) => {
            console.log(response);
            setTasks(response.taskList);
        });
        requestWithToken('GET', '/my-tasks').then((res)=>{
            setVolunteersOwnTasks(res.taskList);
        })
    }, [flag]);
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
    return (
        <>
            <div className={"wrapper"}>
                <h2>Find tasks</h2>
                <VolunteerMap tasks={tasks}/>
            </div>
            <div className={"wrapper"}>
                <h2>Nearby tasks</h2>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className={"task " + task.status}>
                            <h3>{task.name}</h3>
                            <p className={"lead"}>
                                {task.status} - {task.categoryType}
                                <br/>
                                {task.sender ? (task.sender.username + ' - ' + task.sender.email) : null}
                                <br/>
                                {convertToDate(task.fromDate)} - {convertToDate(task.toDate)}
                            </p>
                            <p className={"description"}>{task.description}</p>
                        </div>
                    ))
                ) : (
                    <div>No tasks to show</div>
                )}
            </div>
            <div className={"wrapper volunteer"}>
                <h2>My tasks</h2>
                {volunteersOwnTasks.length > 0 ? (
                    volunteersOwnTasks.map((task) => (
                        <div key={task.id} className={"task " + task.status}>
                            <h3>{task.name}</h3>
                            <p className={"lead"}>
                                {task.status} - {task.categoryType}
                                <br/>
                                {task.sender ? (task.sender.username + ' - ' + task.sender.email) : null}
                                <br/>
                                {convertToDate(task.fromDate)} - {convertToDate(task.toDate)}
                            </p>
                            <p className={"description"}>{task.description}</p>
                            {task.status === 'IN_PROGRESS' &&
                            <button onClick={(event) => {
                                event.preventDefault();
                                requestWithToken("POST", "/volunteer/task-done", {taskId: task.id})
                                    .then(()=>{setFlag(!flag)})
                                    .catch(()=>{setFlag(!flag)})

                            }}>
                                Complete task
                            </button>
                            }
                        </div>
                    ))
                ) : (
                    <div>No tasks to show</div>
                )}
            </div>
        </>
    );
}
import React, {useEffect, useState} from "react";
import useRequest from "../hooks/useRequest";
import useNeedy from "../hooks/useNeedy";

export default function () {

    const [requestWithToken] = useRequest();
    const [tasks, setTasks] = useState([]);
    const [setName, setCategoryType, setDescription, setFromDate, setToDate, submitAddTask] = useNeedy();

    useEffect(() => {
        requestWithToken("GET", "/my-tasks")
            .then(response => {
                console.log(response);
                setTasks(response.taskList);
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

        </>
    );
}


import {useState} from 'react';
import useRequest from "./useRequest";

export default function () {
    const [name, setName] = useState();
    const [categoryType, setCategoryType] = useState();
    const [description, setDescription] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [volunteers, setVolunteers] = useState([]);
    const [requestWithToken] = useRequest();

    function submitAddTask() {
        let toDateTimeStamp = Date.parse(toDate);
        let fromDateTimeStamp = Date.parse(fromDate);
        const data = {
            name,
            categoryType,
            description,
            toDate: toDateTimeStamp,
            fromDate: fromDateTimeStamp,
            location: {
                x: 0,
                y: 0,
            },
        }
        requestWithToken("POST", "/needy/task", data)
            .then((response) => {
            })
            .catch(error => {
            });
    }

    function setVolunteersFromTasks(tasks) {
        let volunteersArray = [];
        if (tasks[0].applier.id) {
            volunteersArray.push(tasks[0].applier);
        }
        let ids = [];
        tasks.forEach(task => {
            ids.push(task.applier.id);
            if (!ids.includes(task.applier.id)) {
                volunteersArray.push(task.applier);
            }
        });
        return volunteersArray;
    }

    return [setName, setCategoryType, setDescription, setFromDate, setToDate, volunteers, setVolunteers, submitAddTask, setVolunteersFromTasks];
}
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
      let ids = [];
      tasks.forEach(task => {
          if (task.applier.id !== null && !ids.includes(task.applier.id)) {
              volunteersArray.push(task.applier);
              ids.push(task.applier.id);
          }
      });
      return volunteersArray;
  }

    return [setName, setCategoryType, setDescription, setFromDate, setToDate, volunteers, setVolunteers, submitAddTask, setVolunteersFromTasks];
}
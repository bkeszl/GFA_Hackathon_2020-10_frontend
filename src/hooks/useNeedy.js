import {useState} from 'react';
import useRequest from "./useRequest";

export default function () {
    const [name, setName] = useState();
    const [categoryType, setCategoryType] = useState();
    const [description, setDescription] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [volunteers, setVolunteers] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const [message, setMessage] = useState();
    const [rating, setRating] = useState();
    const [newTaskMessage, setNewTaskMessage] = useState();
    const [feedbackMessage, setFeedbackMessage] = useState();
    const [location, setLocation] = useState({});
    const [requestWithToken] = useRequest();

    function submitAddTask(event) {
        event.preventDefault();
        let toDateTimeStamp = Date.parse(toDate);
        let fromDateTimeStamp = Date.parse(fromDate);
        const data = {
            name,
            categoryType,
            description,
            toDate: toDateTimeStamp,
            fromDate: fromDateTimeStamp,
            location: {
                x: location.lng,
                y: location.lat,
            },
        }
        requestWithToken("POST", "/needy/task", data)
            .then((response) => {
                setNewTaskMessage('Task posted.');
            })
            .catch(error => {
                setNewTaskMessage('Task adding failed.');
            });
    }

    function setVolunteersFromTasks(tasks) {
      let volunteersArray = [];
      let ids = [];
      tasks.forEach(task => {
          if (task.applier !== null && !ids.includes(task.applier.id)) {
              volunteersArray.push(task.applier);
              ids.push(task.applier.id);
          }
      });
      return volunteersArray;
  }

  function submitFeedback(event) {
        event.preventDefault();
      const data = {
          receiverId,
          message,
          rating,
      }
      requestWithToken("POST", "/feedback", data)
          .then((response) => {
              setFeedbackMessage('Feedback posted.');
          })
          .catch(error => {
              setFeedbackMessage('Adding feedback failed.');
          });
  }

    return [
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
    ];
}
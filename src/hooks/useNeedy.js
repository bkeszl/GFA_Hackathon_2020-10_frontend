import {useState} from 'react';
import useRequest from "./useRequest";

export default function () {
    const [name, setName] = useState();
    const [categoryType, setCategoryType] = useState();
    const [description, setDescription] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
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
        console.log(data);
        requestWithToken("POST", "/needy/task", data)
            .then((response) => {
                alert(response.data)
            })
            .catch(error => {
                alert(error.response.data)
            });
    }

    return [setName, setCategoryType, setDescription, setFromDate, setToDate, submitAddTask];
}
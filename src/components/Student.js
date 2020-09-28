import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

export default function (props) {
  const [requestWithToken] = useRequest();
  const [studentInfo, setStudentInfo] = useState(undefined);


  useEffect(() => {
    async function fetchStudent() {
      let response = await requestWithToken("GET", "/student/" + props.id);
      //setStudentInfo({username: "andi", activities: [{name: "shebang.exe", memoryUsage: "69 MB"}, {name: "shebang.exe", memoryUsage: "69 MB"}]});
      setStudentInfo(response);
    }
    fetchStudent();
  }, [props.id]);

  return (
    <div className="studentInfo">
      
      <h3>{studentInfo ? studentInfo.username : null}</h3>
      <h4>Processes</h4>
      <div className="table">
          <div className="tableHead">
              <div className="column">process_name</div>
              <div className="column">memory_usage</div>
          </div>
        {(studentInfo&&studentInfo.activities) ? studentInfo.activities.map((process) => (
          <div className="tableRow" >
              <div className="column">{process.name}</div>
              <div className="column">{parseFloat(process.memoryUsage).toLocaleString('hu')} Kb</div>
          </div>
        )) : null}
      </div>
    </div>
  );
}

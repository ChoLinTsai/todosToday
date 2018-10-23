import React from 'react';
import { Button } from "reactstrap";


const DoneList = props => (
  <ul className="doneList">
    {props.done.map((item, index) => (
      <li key={index}>
        <div>
          <div className="taskName" style={props.doneStyle}>
            {item}
          </div>
        </div>
        <div>
          <Button color="success" size="sm">
            Done
          </Button>
        </div>
      </li>
    ))}
  </ul>
)

export default DoneList;

import React from 'react';
import { Button } from "reactstrap";

const TodoList = props => (
  <ul className="todoList">
    {props.items.map((item, index) => (
      <li key={index}>
        <div>
          <div className="taskName" style={props.doneStyle}>
            {item}
          </div>
        </div>
        <div>
          <Button
            onClick={() => props.doneItem(item)}
            color="success"
            size="sm">
            Done
          </Button>
          <Button
            onClick={() => props.deleteItem(item)}
            color="danger"
            size="sm">
            Delete
          </Button>
        </div>
      </li>
    ))}
  </ul>
);


export default TodoList;

import React, { Component } from "react";
import "./todos.scss";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";



const List = {task} => (
  <ul>
    {
      task.map( (item, index) => <li key={index}>{item}</li>)
    }
  </ul>
)




export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: ""
    };
  }

  onChange(e) {
    this.setState({
      task: e.target.value
    });
  }

  render() {
    return (
      <div className="todoPanel">
        
        <div className="addSection">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Add task</InputGroupText>
            </InputGroupAddon>
            <Input value={this.state.task} onChange={e => this.onChange(e)} />
            <Button color="primary">ADD</Button>
          </InputGroup>
        </div>

        <ul className="taskList">
          <li className="items">
            <div>
              <div className="taskName">UI layout</div>
            </div>
            <div>
              <Button color="success">Done</Button>
              <Button color="danger">Delete</Button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

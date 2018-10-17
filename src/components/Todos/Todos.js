import React, { Component } from "react";
import "./todos.scss";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

const Lists = props => (
  <ul className="taskList">
    {props.items.map((item, index) => (
      <li key={index}>
        <div>
          <div className="taskName" style={props.doneStyle}>
            {item}
          </div>
        </div>
        <div>
          <Button color="success" onClick={() => props.doneItem(item)}>
            Done
          </Button>
          <Button color="danger" onClick={() => props.removeItem(item)}>
            Delete
          </Button>
        </div>
      </li>
    ))}
  </ul>
);

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      items: [],
      done: false,
      doneStyle: "none"
    };
  }

  componentDidMount() {
    let getTimeStamp = this.getTime();
    let getTasks = localStorage.getItem(getTimeStamp);
    let parsedTasks = JSON.parse(getTasks);
    this.setState({
      items: parsedTasks || []
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.done !== this.state.done) {
      this.setState({
        doneStyle: this.state.done ? "line-through" : "none"
      });
    }
  }

  onChange(e) {
    this.setState({
      task: e.target.value
    });
  }

  getTime() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let MM = today.getMonth();
    let dd = today.getDate();
    return `${yyyy}${MM + 1}${dd}`;
  }

  saveToLocal() {
    let getTimeStamp = this.getTime();
    let dataToSave = JSON.stringify(this.state.items);
    localStorage.setItem(getTimeStamp, dataToSave);
  }

  addTask() {
    if (this.state.task === "") return;
    this.setState(
      {
        task: "",
        items: [...this.state.items, this.state.task]
      },
      () => this.saveToLocal()
    );
  }

  doneItem() {
    this.setState({
      done: !this.state.done
    });
  }

  removeItem(taskName) {
    this.setState(
      {
        items: this.state.items.filter(el => el !== taskName)
      },
      () => this.saveToLocal()
    );
  }

  render() {
    const doneItem = {
      textDecoration: this.state.doneStyle
    };

    return (
      <div className="todoPanel">
        <div className="addSection">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Add task</InputGroupText>
            </InputGroupAddon>
            <Input value={this.state.task} onChange={e => this.onChange(e)} />
            <Button color="primary" onClick={() => this.addTask()}>
              ADD
            </Button>
          </InputGroup>
        </div>

        <Lists
          items={this.state.items}
          doneItem={() => this.doneItem()}
          removeItem={name => this.removeItem(name)}
          doneStyle={doneItem}
        />
      </div>
    );
  }
}

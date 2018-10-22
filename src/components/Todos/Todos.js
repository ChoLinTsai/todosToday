import React, { Component } from "react";
import TodoList from "./TodoList";
import DoneList from "./DoneList";
import "./todos.scss";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      items: [[], []],
      done: false,
      doneStyle: "none"
    };
  }

  componentDidMount() {
    let getTimeStamp = this.getTime();
    let getTasks = localStorage.getItem(getTimeStamp);
    let parsedTasks = JSON.parse(getTasks);
    this.setState({
      items: parsedTasks || [[], []]
    });
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
    return `${yyyy}/${MM + 1}/${dd}`;
  }

  saveToLocal() {
    let getTimeStamp = this.getTime();
    let dataToSave = JSON.stringify(this.state.items);
    localStorage.setItem(getTimeStamp, dataToSave);
  }

  addTask() {
    this.setState(
      {
        task: "",
        items: [
          [...this.state.items[0], this.state.task],
          [...this.state.items[1]]
        ]
      },
      () => this.saveToLocal()
    );
  }

  doneItem(item) {
    this.setState(
      {
        items: [
          this.state.items[0].filter(el => el !== item),
          [
            ...this.state.items[1],
            this.state.items[0].filter(el => el === item)
          ]
        ]
      },
      () => this.saveToLocal()
    );
  }

  removeItem(taskName) {
    this.setState(
      {
        items: [
          this.state.items[0].filter(el => el !== taskName),
          [...this.state.items[1]]
        ]
      },
      () => this.saveToLocal()
    );
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
            <Button color="primary" onClick={() => this.addTask()}>
              ADD
            </Button>
          </InputGroup>
        </div>

        <TodoList
          doneItem={item => this.doneItem(item)}
          items={this.state.items[0]}
          removeItem={name => this.removeItem(name)}
        />

        <DoneList
          done={this.state.items[1]}
          doneItem={item => this.doneItem(item)}
        />
      </div>
    );
  }
}

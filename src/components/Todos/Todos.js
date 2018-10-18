import React, { Component } from "react";
import "./todos.scss";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

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
          <Button onClick={() => props.doneItem(item)} color="success" size="sm">
            Done
          </Button>
          <Button onClick={() => props.removeItem(item)} color="danger" size="sm">
            Delete
          </Button>
        </div>
      </li>
    ))}
  </ul>
);

const DoneList = props => (
  <ul className="doneList">
    {console.log(props)}
    {props.done.map((item, index) => (
      <li key={index}>
        <div>
          <div className="taskName" style={props.doneStyle}>
            {item}
          </div>
        </div>
        <div>
          <Button onClick={() => props.doneItem(item)} color="success" size="sm">
            Done
          </Button>
        </div>
      </li>
    ))}
  </ul>
)

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      items: [[],['123123']],
      done: false,
      doneStyle: "none"
    };
  }

  componentDidMount() {
    let getTimeStamp = this.getTime();
    let getTasks = localStorage.getItem(getTimeStamp);
    let parsedTasks = JSON.parse(getTasks);
    this.setState({
      items: parsedTasks || [[],[]]
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
    this.setState({
        task: "",
        items: [[...this.state.items[0], this.state.task],[...this.state.items[1]]],
    },
    () => this.saveToLocal()
    );
  }

  doneItem(item) {
    this.setState({
      items: [
        this.state.items[0].filter(el => el !== item),
        [...this.state.items[1],this.state.items[0].filter(el => el === item)],
      ]
    },
      () => this.saveToLocal()
    );
  }

  removeItem(taskName) {
    console.log(123, this.state.items[0].filter(el => el !== taskName))
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

        <TodoList
          doneItem={(item) => this.doneItem(item)}
          items={this.state.items[0]}
          removeItem={(name) => this.removeItem(name)}
          doneStyle={doneItem}
        />

        <DoneList
          done={this.state.items[1]}
          doneItem={(item) => this.doneItem(item)}

        />
      </div>
    );
  }
}

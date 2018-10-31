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
      initDate: "",
      currentDate: "",
      task: "",
      items: [[], []],
      isInitUpdate: true,
      needRender: false
    };
  }

  componentDidMount() {
    // let getTimeStamp = this.props.date.format('YYYY/MM/DD');
    // let getTasks = localStorage.getItem(getTimeStamp);
    // let parsedTasks = JSON.parse(getTasks);
    // this.setState({
    //   initDate: getTimeStamp,
    //   items: parsedTasks || [[], []]
    // });
  }

  shouldComponentUpdate(newProps, newState) {
    let newDate = newProps.date.format("YYYY/MM/DD");
    // only invoke once when mounting
    if (newDate === newState.initDate) return true;

    // check if newProps.date !== this.state.currentDate
    if (newDate !== this.state.currentDate) return true;

    return true;
  }

  componentDidUpdate(oldProps, oldState) {
    let getLocalKeys = Object.keys(localStorage);
    let getDate = this.props.date.format("YYYY/MM/DD");
    let filterDate = getLocalKeys.filter(i => i === getDate);
    let getTasks = localStorage.getItem(getDate);
    let parsedTasks = JSON.parse(getTasks);

    // only invoke once after mounting
    if (this.state.isInitUpdate) {
      this.setState({
        currentDate: getDate,
        items: filterDate.length > 0 ? parsedTasks : [[], []],
        isInitUpdate: false
      });
    }

    // check everytime when this cmp gets a newDate
    if (this.props.date.format("YYYY/MM/DD") !== oldState.currentDate) {
      this.setState({
        currentDate: getDate,
        items: filterDate.length > 0 ? parsedTasks : [[], []]
      });
    }
  }

  onChange(e) {
    this.setState({
      task: e.target.value
    });
  }

  saveToLocal() {
    let getTimeStamp = this.props.date.format("YYYY/MM/DD");
    let dataToSave = JSON.stringify(this.state.items);
    localStorage.setItem(getTimeStamp, dataToSave);
  }

  addTask() {
    if (this.state.task === "") return;
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

  deleteItem(item) {
    this.setState(
      {
        items: [
          this.state.items[0].filter(el => el !== item),
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
            <Button
              className="addBtn"
              color="primary"
              onClick={e => this.addTask(e)}
            >
              ADD
            </Button>
          </InputGroup>
        </div>

        <TodoList
          doneItem={item => this.doneItem(item)}
          items={this.state.items[0]}
          deleteItem={item => this.deleteItem(item)}
        />

        <DoneList
          done={this.state.items[1]}
          doneItem={item => this.doneItem(item)}
        />
      </div>
    );
  }
}

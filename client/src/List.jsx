import React from "react";
import Item from "./Item";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
let previous = 0;

function create(name, id) {
  let request = new XMLHttpRequest();
  let data = JSON.stringify({
    list_name: name,
    code: id,
  });
  request.open("POST", "http://localhost:9000/createList", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", () => {
    if (request.response !== "ok") {
      console.log(request.response);
    } else {
      console.log(request.response);
    }
  });
  request.send(data);
  previous = parseInt(id);
}

let i = 0;
let currentElement = '';
let activeElement = '';



class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: this.props.status,
      title: this.props.name,
      disabled: false,
      previous: "",
    };
    this.addItem = this.addItem.bind(this);
    this.del = this.del.bind(this);
    this.DragOver = this.DragOver.bind(this);
    this.DragEnd = this.DragEnd.bind(this)
  }

  saveItem = (text) => {
    let x = this;
    if (text !== this.state.previous) {
      let data = JSON.stringify({
        code: getRandomInt(10000, 99999),
        list_name: this.state.title,
        text: text,
        date: Date.now()/1000
      });
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:9000/addToList", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", () => {
        if (request.response === "ok") {
          console.log(request.response);
        } else {
          console.log(request.response);
        }
      });
      request.send(data);
      x.setState({ previous: text });
    }
  };

  deleteItem = (number, id) => {
    const x = this;
    let data = JSON.stringify({
      code: id,
      post_id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/delFromList", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", () => {});
    request.send(data);
    let data1 = x.state.data;
    let data2 = [];
    console.log("data1", data1);
    data1.forEach((elem) => {
      console.log(elem.key, number);
      if (parseInt(elem.key) === parseInt(number)) {
        console.log("yes");
      } else {
        data2.push(elem);
      }
    });
    console.log(data2);
    x.setState({ data: data2 });
  };

  componentDidMount() {
    const x = this;
    if (this.props.items !== undefined) {
      console.log(x.props.items);
      let items = x.props.items;
      let arr = [];
      items.forEach((element) => {
        arr.push(
          <Item
            key={i}
            number={i}
            saveItem={this.saveItem}
            deleteItem={x.deleteItem}
            data={element}
            id={element.id}
            date={element.date}
          />
        );
        i++;
      });
      x.setState({ name: x.props.name, data: arr });
    } else {
      x.setState({ name: x.props.name });
    }

    if (this.props.name === "") {
      x.setState({ disabled: true });
    }
  }

  addItem() {
    let items = this.state.data;
    items.push(
      <Item
        key={i}
        number={i}
        saveItem={this.saveItem}
        deleteItem={this.deleteItem}
      />
    );
    i++;
    items = [...items];
    this.setState({ data: items });
  }

  del() {
    this.props.delList(this.props.id);
  }

  DragOver(evt) {
    if (evt.target.className === "list") {
      // console.log(evt.target)
      // const tasksListElement = document.querySelector(`.list`);
      evt.preventDefault();
      activeElement = document.querySelector(`.selected`);
      currentElement = evt.target;
    }
  }

  DragEnd(){
    console.log('1',)
    let element = currentElement.childNodes[currentElement.childNodes.length-2];
    this.props.moveItem(currentElement.id,activeElement.id)
    element.after(activeElement)
  }

  render() {
    if (this.state.status) {
      return (
        <div className="list" id={this.props.id} onDragEnd={this.DragEnd} onDragOver={this.DragOver}>
          <div
            style={{
              height: "max-content",
              minHeight: "24px",
              marginBottom: "4rem",
            }}
          >
            <p style={{ width: "80%", float: "left", fontSize: "x-large" }}>
              {this.state.title}
            </p>
            <IconButton style={{ float: "inline-end" }} onClick={this.del}>
              <CloseIcon />
            </IconButton>
          </div>

          {this.state.data.map((element) => (
            element
          ))}

          <div className="addItemBttn">
            <IconButton
              onClick={this.addItem}
              aria-label="delete"
              className="ok_bttn"
              disabled={this.state.disabled}
            >
              <Add />
            </IconButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className="list" DragEnd={this.DragEnd} onDragOver={this.DragOver}>
          <div
            style={{
              height: "max-content",
              minHeight: "24px",
              marginBottom: "4rem",
            }}
          >
            <TextField
              id="standard-basic"
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
              label="Назва списку"
              style={{ width: "80%", float: "left", fontSize: "x-large" }}
            />
            <IconButton
              onClick={() => {
                this.setState({
                  status: !this.state.status,
                  disabled: false,
                });
                create(this.state.title, this.props.id);
              }}
              aria-label="delete"
              className="ok_bttn"
            >
              <Add />
            </IconButton>
            <IconButton style={{ float: "inline-end" }} onClick={this.del}>
              <CloseIcon />
            </IconButton>
          </div>

          {this.state.data.map((element) => (
            <div>{element}</div>
          ))}

          <div className="addItemBttn">
            <IconButton
              disabled={this.state.disabled}
              onClick={this.addItem}
              aria-label="delete"
              className="ok_bttn"
            >
              <Add />
            </IconButton>
          </div>
        </div>
      );
    }
  }
}

export default List;

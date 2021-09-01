import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";

function time(date){
  if(isNaN(date)){
    return "0 min";
  }
  const time_now =parseInt((Date.now()/1000 - date)/60);
  console.log(time_now)
  if(time_now<60){
    return time_now+" min";
  }else if(time_now/60>=1 && time_now/60<24){
    return parseInt(time_now/60)+" hours"
  }else{
    return parseInt(time_now/60/24)+" days"
  }
}


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      date: null,
      status: false,
      date:null
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.CreateItem = this.CreateItem.bind(this);
    this.DeleteItem = this.DeleteItem.bind(this);
    this.DragStart = this.DragStart.bind(this);
    this.DragEnd = this.DragEnd.bind(this);
  }
  componentDidMount() {
    if (this.props.data !== undefined) {
      this.setState({ text: this.props.data.text });
    } else {
      this.setState({ status: true });
    }
  }

  saveChanges(event) {
    this.setState({ text: event.target.value });
  }

  CreateItem() {
    if (this.state.text !== null) {
      this.setState({ status: false });
      this.props.saveItem(this.state.text);
    }
  }

  DeleteItem() {
    this.props.deleteItem(this.props.number, this.props.id);
  }

  DragStart(evt) {
    // const tasksListElement = document.getElementById(this.props.id);
    evt.target.classList.add(`selected`);
  }
  DragEnd(evt) {
    evt.target.classList.remove(`selected`);
  }

  render() {
    if (this.state.status) {
      return (
        <div
          style={{
            width: "90%",
            height: "max-content",
            marginLeft: "3%",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            marginTop: "1rem",
            fontFamily: "'Inconsolata', monospace",
          }}
          id={this.props.id}
          draggable="true"
          onDragStart={this.DragStart}
          onDragEnd={this.DragEnd}
        >
          <TextField
            id="standard-basic"
            onChange={this.saveChanges}
            label="Введіть текст"
            style={{ width: "85%", float: "left" }}
          />
          <IconButton aria-label="delete" className="ok_bttn">
            <Add onClick={this.CreateItem} />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div
        id={this.props.id}
          style={{
            width: "90%",
            height: "max-content",
            marginLeft: "3%",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            marginTop: "1rem",
            fontFamily: "'Inconsolata', monospace",
          }}
          draggable="true"
          onDragStart={this.DragStart}
          onDragEnd={this.DragEnd}
        >
          <p style={{ wordWrap: "anywhere", width: "87%", float: "left" }}>
            {this.state.text}
          </p>
          
          <IconButton
            aria-label="delete"
            className="del_bttn"
            onClick={this.DeleteItem}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <p style={{fontSize:'x-small'}}>last modified:{time(this.props.date)} ago</p>
        </div>
      );
    }
  }
}

export default Item;

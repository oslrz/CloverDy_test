import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import List from "./List";
import Button from "@material-ui/core/Button";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
    this.addList = this.addList.bind(this);
  }

  componentDidMount() {
    const x = this;
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9000/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.responseType = "json";
    request.addEventListener("load", () => {
      let arr = [];
      request.response.data.forEach((element) => {
        arr.push(
          <List
            status={true}
            key={element.id}
            id={element.id}
            name={element.name}
            items={element.items}
            addList={this.addList}
            delList={this.delList}
            moveItem={this.moveItem}
          />
        );
      });
      x.setState({ data: arr });
    });
    request.send();
  }
  addList() {
    let x = this;
    let list_id = getRandomInt(10000, 99999);
    let arr = x.state.data;
    arr.push(<List moveItem={this.moveItem} key={list_id} id={list_id} delList={this.delList} status={false} name="" />);
    arr = [...arr];
    x.setState({ data: arr });
  }

  delList = id =>{
    const x = this;
    let data = JSON.stringify({
      code:id
    })
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/delList", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", () => {
      let data1 = x.state.data
      let data2 = [];
      data1.forEach(elem =>{
        console.log(id,elem.key)
        if(parseInt(elem.key) !==parseInt(id)){
          data2.push(elem)
        }
      })
      x.setState({data:data2})
    })
    request.send(data)
  }

  moveItem(tableId,elemId){
    let data = JSON.stringify({
      table:tableId,
      elem:elemId
    })
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/moveItem", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", () => {
      console.log('ok')
    });
    request.send(data)
  }


  render() {
    return (
      <div>
        {this.state.data}
        <Button
          onClick={this.addList}
          style={{ marginTop: "1rem" }}
          variant="contained"
          color="primary"
        >
          Add List
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

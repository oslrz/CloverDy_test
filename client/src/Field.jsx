// import React from "react";
// import List from "./List";
// import Button from "@material-ui/core/Button";


// class Field extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: [] };
//     this.addList = this.addList.bind(this);
//   }



//   componentDidMount() {
//     const x = this;
//     let request = new XMLHttpRequest();
//     request.open("GET", "http://localhost:9000/", true);
//     request.setRequestHeader("Content-Type", "application/json");
//     request.responseType = "json";
//     request.addEventListener("load", () => {
//       let data = request.response.data;
//       let arr = [];
//       console.log(data);
//       data.forEach((element) => {
//         console.log("element", element);
//         arr.push(
//           <List
//             id={element.id}
//             rerender={this.rerender}
//             status={true}
//             name={element.name}
//             items={JSON.stringify(element.items)}
//           />
//         );
//       });
//       x.setState({ data: arr });
//     });
//     request.send();
//   }

//   rerender = () => {
//     this.forceUpdate();
//   };

//   addList() {
//     let arr = [this.state.data];
//     arr.push(<List rerender={this.rerender} status={false} name="" />);
//     arr = [...arr];
//     this.setState({ data: arr });
//   }

//   render() {
//     return (
   
//         <div>
//           {this.state.data}

//         </div>

//     );
//   }
// }

// export default Field;

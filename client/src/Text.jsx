import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import { Draggable } from "react-beautiful-dnd";
class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable>
        <TextField
          id="standard-basic"
          onChange={this.props.saveChanges}
          label="Введіть текст"
          style={{ width: "85%", float: "left" }}
        />
        <IconButton aria-label="delete" className="ok_bttn">
          <Add onClick={this.props.CreateItem} />
        </IconButton>
      </Draggable>
    );
  }
}

export default Text;

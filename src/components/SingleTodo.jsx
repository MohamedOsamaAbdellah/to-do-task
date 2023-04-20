import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteTodo, editTodo } from "../store/todos/TodosSlice";
import { CloseOutlined } from "@material-ui/icons";

const SingleTodo = ({ todo }) => {
  // dispatch is a function that takes an action as an argument and sends it to the store
  const dispatch = useDispatch();

  // destructuring the todo object
  const { title, description, id } = todo;

  // state to toggle edit mode
  const [edit, setEdit] = useState(false);

  // state to hold the edited title
  const [titleEdit, setTitleEdit] = useState(title);

  // state to hold the edited description
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  // dispatching the deleteTodo action
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // dispatching the editTodo action
  const handleEdit = () => {
    dispatch(
      editTodo({
        id: id,
        title: titleEdit,
        description: descriptionEdit,
      })
    );
  };

  return (
    // ListItem is a wrapper for the list items
    <ListItem key={todo.id}>
      {/* ListItemText is a wrapper for the primary and secondary text */}
      <ListItemText primary={todo.title} secondary={todo.description} />
      {
        // if the todo is not completed, show the edit and delete buttons
        !edit && (
          <ListItemSecondaryAction>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setEdit(true)}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )
      }
      {
        // if the todo is completed, show the edit and delete buttons
        edit && (
          <div
            className="add-todo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => setEdit(false)}>
              <CloseOutlined />
            </IconButton>
            {/* TextField is a wrapper for the input field */}
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              type="text"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="text"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleEdit(titleEdit, descriptionEdit, id);
                setEdit(false);
              }}
              style={{ marginLeft: "10px" }}
            >
              Add
            </Button>
          </div>
        )
      }
    </ListItem>
  );
};

export default SingleTodo;

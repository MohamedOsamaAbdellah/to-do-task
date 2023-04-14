import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  toggleTodo,
  deleteTodo,
  editTodo,
  addTodo,
} from "../store/todos/TodosSlice";
import { CloseOutlined, DeleteOutline } from "@material-ui/icons";

const SingleTodo = ({ todo }) => {
  const { title, description, id } = todo;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  const handleCheck = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };
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
    <ListItem key={todo.id}>
      <ListItemText primary={todo.title} secondary={todo.description} />
      {!edit && (
        <ListItemSecondaryAction>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
      {edit && (
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
      )}
    </ListItem>
  );
};

export default SingleTodo;

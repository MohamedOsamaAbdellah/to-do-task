import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./SingleTodo";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todos/TodosSlice";
import { v4 as uuidv4 } from "uuid";
import { DeleteOutline } from "@material-ui/icons";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos.todos);
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (newTitle, newDescription) => {
    dispatch(
      addTodo({
        id: uuidv4(),
        title: newTitle,
        description: newDescription,
        checked: false,
        archive: false,
      })
    );
  };

  return (
    <>
      {todos.todos?.length > 0 &&
        todos.todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      <IconButton onClick={() => setAdd(!add)}>
        <AddIcon />
      </IconButton>
      {todos.todos?.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Todos</h1>
      )}

      {add && (
        <div className="add-todo">
          <IconButton onClick={() => setAdd(false)}>
            <DeleteOutline />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="button"
            style={{ marginTop: "10px", marginLeft: "20px" }}
            onClick={() => {
              handleAdd(title, description);
              setAdd(false);
            }}
          >
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default TodoList;

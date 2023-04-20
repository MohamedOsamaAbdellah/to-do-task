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
  // dispatch is a function that takes an action as an argument and sends it to the store
  const dispatch = useDispatch();

  // todos is an array of todo objects, which is stored in the store
  const todos = useSelector((state) => state.todos);

  // These are the states for the add todo form
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // This is the function that dispatches the addTodo action
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
      {// if the todos array is not empty, map through the todos array and render the TodoItem component for each todo
        todos.todos?.length > 0 &&
          todos.todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      }
      <IconButton onClick={() => setAdd(!add)}>
        <AddIcon />
      </IconButton>
      {// if the todos array is empty, show the No Todos message
        todos.todos?.length === 0 && (
          <h1 style={{ textAlign: "center" }}>No Todos</h1>
        )
      }

      { // if the add state is true, show the add todo form
        add && (
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
                // call the handleAdd function and pass the title and description as arguments
                handleAdd(title, description);
                setAdd(false);
              }}
            >
              Save
            </Button>
          </div>
        )
      }
    </>
  );
};

export default TodoList;

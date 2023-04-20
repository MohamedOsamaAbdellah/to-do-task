import { createSlice } from "@reduxjs/toolkit";

// Initial state of the store
const initialState = {
  todos: [],
};

// Creating the todos slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // action to get all the todos
    getTodos: (state, action) => {
      state.todos = action.payload;
    },

    // action to add a todo
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    // action to edit a todo
    editTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];
        todo.title = title;
        todo.description = description;
      }
    },

    // action to delete a todo
    deleteTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.todos.splice(todoIndex, 1);
      }
    },

    // action to toggle a todo
    toggleTodo: (state, action) => {
      const { id, checked } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].checked = checked;
      }
    },

    // action to archive a todo
    archiveTodo: (state, action) => {
      const { id, archive } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].archive = archive;
      }
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  archiveTodo,
  getTodos,
} = todosSlice.actions;
export default todosSlice.reducer;

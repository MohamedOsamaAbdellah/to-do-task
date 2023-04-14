import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },

    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].title = title;
        state.todos[todoIndex].description = description;
      }
    },
    deleteTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.todos.splice(todoIndex, 1);
      }
    },
    toggleTodo: (state, action) => {
      const { id, checked } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].checked = checked;
      }
    },
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

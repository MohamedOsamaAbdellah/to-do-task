import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/TodosSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;

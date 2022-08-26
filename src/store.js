import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../src/features/counter/todosSlice.js";

export const store = configureStore({
    reducer: {
      todos: todosReducer,
    },
  })
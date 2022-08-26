import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [], // for all todos
    completedTodos: [], // for all the completed todos
    activeTodos: [], // for all the active todos
    showTodos: true,
    showCompletedTodos: false,
    showActiveTodos: false,
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {

      addTodo: (state, action) => {
        state.todos.push(action.payload);
      },
      completeTodo: (state, action) => {
       state.todos.forEach((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
       })
      },
      removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        if (state.completedTodos.findIndex((todo) => todo.id === action.payload) !== -1) {
          state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload);
        }
        if (state.activeTodos.findIndex((todo) => todo.id === action.payload) !== -1) {
          state.activeTodos = state.activeTodos.filter((todo) => todo.id !== action.payload);
        }
      },

      showAllTodos: (state) => {
        state.showTodos = true;
        state.showActiveTodos = false;
        state.showCompletedTodos = false;
      },

      showAllActiveTodos: (state) => {
        const activeTodos = state.todos.filter((todo) => !todo.completed);
        state.activeTodos = activeTodos;
        state.showTodos = false;
        state.showActiveTodos = true;
        state.showCompletedTodos = false;
      },

      showAllCompletedTodos: (state) => {
        const completeTodos = state.todos.filter((todo) => todo.completed);

        state.completedTodos = completeTodos;
        state.showTodos = false;
        state.showActiveTodos = false;
        state.showCompletedTodos = true;
      },
      clearCompletedTodos: (state) => {
        state.completedTodos = [];
        state.todos = state.todos.filter((todo) => !todo.completed);
      }

    },
  })
  

  export const { addTodo, completeTodo, removeTodo, showAllTodos, showAllActiveTodos, showAllCompletedTodos, clearCompletedTodos } = todosSlice.actions;
  
  export const selectedTodo = (state) => state.todos.todos;
  export const selectCompletedTodos = (state) => state.todos.completedTodos;
  export const selectActiveTodos = (state) => state.todos.activeTodos;

  export const selectShowTodos = (state) => state.todos.showTodos;
  export const selectShowCompletedTodos = (state) => state.todos.showCompletedTodos;
  export const selectShowActiveTodos = (state) => state.todos.showActiveTodos;


  export default todosSlice.reducer;
import { useRef } from "react";
import Todo from "../Todo/Todo";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, clearCompletedTodos, selectActiveTodos, selectCompletedTodos, selectedTodo, selectShowTodos, selectShowCompletedTodos, selectShowActiveTodos  } from "../../features/counter/todosSlice.js";
import { showAllCompletedTodos, showAllTodos, showAllActiveTodos } from "../../features/counter/todosSlice.js";


const Todos = () => {

    const dispatch = useDispatch();
    const inputRef = useRef();
    
    // main states for todos, active todos and completed todos
    const todos = useSelector(selectedTodo);
    const completedTodos = useSelector(selectCompletedTodos);
    const activeTodos = useSelector(selectActiveTodos);

    // states for showing jist actvie todos or completed todos or all of them
    const showTodos = useSelector(selectShowTodos);
    const showCompletedTodos = useSelector(selectShowCompletedTodos);
    const showActiveTodos = useSelector(selectShowActiveTodos);

    let todosToRender; // a variable for controlling what kind of todos to show
    let activeTodosNumber = 0; // we can also use todos.length no difference

    const submitTodo = (e) => {
        e.preventDefault();
        if (inputRef.current.value.trim()) {
            dispatch(addTodo({
                id: Date.now(),
                content: inputRef.current.value,
                completed: false
            }))
        }
        inputRef.current.value = "";
    }

    const showAllCompletedTodosHnadler = () => {
        dispatch(showAllCompletedTodos());
    }
    const showAllTodosHnadler = () => {
        dispatch(showAllTodos());
    }
    const showAllActiveTodosHnadler = () => {
        dispatch(showAllActiveTodos());
    }
    const clearCompletedTodosHandler = () => {
        dispatch(clearCompletedTodos());
    }

    // todosToRender
    if (showActiveTodos) {
        todosToRender = activeTodos;
    }else if(showCompletedTodos) {
        todosToRender = completedTodos;
    }else {
        todosToRender = todos;
    }

    //we can, NOT use this and instead add todos.length
    todos.forEach(todo => {
        if (!todo.completed) {
            activeTodosNumber++;
        }
    });
    
    return ( 
        <div className="todos">
            <div className="todosHeader">
                <h1>Todos</h1>
            </div>
            <div className="input_container">
                <div className="circle"></div>
                <form onSubmit={submitTodo}>
                    <input type="text" ref={inputRef} placeholder="Create A New Todo..."/>
                    <button type="submit" hidden></button>
                </form>
            </div>
            <div className="todos_container">
                {
                    todosToRender.map((todo) => (
                        <Todo content={todo.content} key={todo.id} id={todo.id} completed={todo.completed}/>
                    ))
                }
                <div className="todos_footer">
                    <p>{activeTodosNumber} items left</p>
                    <div className="types">
                        <div className="types">
                            <p className={`clear ${showTodos ? "active" : ""}`} onClick={showAllTodosHnadler}>
                                All
                            </p>
                            <p className={`clear ${showActiveTodos ? "active" : ""}`} onClick={showAllActiveTodosHnadler}>
                                Active
                            </p>
                            <p className={`clear ${showCompletedTodos ? "active" : ""}`} onClick={showAllCompletedTodosHnadler}>
                                Completed
                            </p>
                        </div>
                    </div>
                    <p className="clear" onClick={clearCompletedTodosHandler}>Clear Completed</p>
                </div>
            </div>
        </div>
     );
}
 
export default Todos;
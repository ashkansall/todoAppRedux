import { completeTodo, removeTodo } from "../../features/counter/todosSlice";
import { useDispatch } from "react-redux";

const Todo = ({ content, completed, id }) => {

    const dispatch = useDispatch();

    const completeTodoHandler = () => {
        dispatch(completeTodo(id));
    }
    const removeTodoHandler = () => {
        dispatch(removeTodo(id));
    }

    return ( 
        <div className="todo_container" onClick={completeTodoHandler}>
            <li className={`todo ${completed ? "active" : ""}`}>{content}</li>
            <div className={`circle ${completed ? "active" : ""}`}></div>
            <span className="delete-icon" onClick={removeTodoHandler}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" width="16px" height="16px" baseProfile="basic">
                    <rect width="4" height="15" x="6" y=".5" fill="#fe3155" transform="rotate(45.001 8 8)"/>
                    <rect width="4" height="15" x="6" y=".5" fill="#fe3155" transform="rotate(134.999 8 8)"/>
                </svg>
            </span>
        </div>
     );
}
 
export default Todo;
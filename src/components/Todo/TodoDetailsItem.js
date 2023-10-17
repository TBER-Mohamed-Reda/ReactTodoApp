import { Navigate, useNavigate, useParams } from "react-router-dom";
import FloatingButton from "../UI/FloatingButton";
import { useContext } from "react";
import TodoContext from "../../context/todoContext";
const TodoDetailsItem = () => {
  const { id } = useParams();
  const ctx = useContext(TodoContext);
  const { isLoggedIn } = useContext(TodoContext);
  const navigate = useNavigate();
  let todoItem = ctx.todoItems.find((item) => item.id === parseInt(id));
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="about-container">
        <h1>todo details</h1>
        <h3>Id:</h3>
        <p>{id}</p>
        <h3>Todo:</h3> <p>{todoItem.todo}</p>
        <h3>CreatedAt:</h3>{" "}
        <p>
          {todoItem.createdAt.toLocaleString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <h3>Complete:</h3> <p>{todoItem.complete.toString()}</p>
        <h3>Priority:</h3> <p>{todoItem.priority}</p>
        <h3>UpdatedAt:</h3>
        <p>
          {todoItem.updatedAt.toLocaleString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
      <button className="btn " onClick={() => navigate(-1)}>
        Back
      </button>
      <FloatingButton />
    </>
  );
};
export default TodoDetailsItem;

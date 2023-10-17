import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faPenToSquare,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = (props) => {
  const getColorClass = (priority) => {
    switch (priority.toString()) {
      case "1":
        return "bg-primary";
      case "2":
        return "bg-dark";
      case "3":
        return "bg-danger";
      case "4":
        return "bg-info";
      default:
        return "bg-light";
    }
  };
  return (
    <>
      <ul className="list-group todos mx-auto text-light">
        <li
          className={`list-group-item d-flex justify-content-between align-items-center ${
            props.todoItem.complete === true ? "item-complete" : ""
          }`}
        >
          <span>{props.todoItem.todo}</span>
          <div>
            <FontAwesomeIcon
              style={{
                marginRight: "0.3em",
              }}
              icon={faInfoCircle}
              className="pointer"
              onClick={() => props.viewItems(props.todoItem.id)}
            />
            <FontAwesomeIcon
              style={{
                marginRight: "0.3em",
              }}
              icon={props.todoItem.complete ? faXmark : faCheck}
              className="pointer"
              onClick={() => props.updateCompleteItems(props.todoItem.id)}
            />

            <FontAwesomeIcon
              style={{
                marginRight: "0.3em",
              }}
              icon={faPenToSquare}
              className="pointer"
              onClick={() =>
                props.editItems(
                  props.todoItem.id,
                  props.todoItem.todo,
                  props.todoItem.priority
                )
              }
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="pointer"
              onClick={() => props.deleteItems(props.todoItem.id)}
            />

            <span
              className={`badge ${getColorClass(
                props.todoItem.priority
              )} m-lg-2`}
            >
              {props.todoItem.priority}
            </span>
          </div>
        </li>
      </ul>
    </>
  );
};
export default TodoItem;

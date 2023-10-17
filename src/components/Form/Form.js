import { useContext } from "react";
import TodoContext from "../../context/todoContext";

const Form = ({ addForm, setAddForm }) => {
  const { setTodoItems, todoItems } = useContext(TodoContext);
  const generateId = () => Math.floor(Math.random() * 1000);

  const handleChange = (e) => {
    setAddForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoItems([
      ...todoItems,
      {
        id: generateId(),
        todo: addForm.todo,
        complete: false,
        priority: addForm.priority.toString(),
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
    setAddForm({ todo: "", priority: "1" });
  };

  return (
    <form className="add text-center my-4" onSubmit={handleSubmit}>
      <label htmlFor="add" className="add text-light">
        Add a new todo:
      </label>
      <input
        type="text"
        className="form-control m-auto"
        name="todo"
        id="todo"
        value={addForm.todo}
        onChange={handleChange}
      />
      <select
        className="form-control mt-2"
        name="priority"
        id="priority"
        value={addForm.priority}
        onChange={handleChange}
      >
        <option>Choose priority</option>
        <option value="1">High</option>
        <option value="2">Extra Medium</option>
        <option value="3">Medium</option>
        <option value="4">Low</option>
      </select>

      <button type="submit" className="btn mt-2 ">
        save
      </button>
    </form>
  );
};
export default Form;

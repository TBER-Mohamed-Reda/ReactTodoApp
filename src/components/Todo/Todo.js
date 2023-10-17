/* eslint-disable array-callback-return */
import { useContext, useState } from "react";
import TodoItem from "./TodoItem";
import Form from "../Form/Form";
import FloatingButton from "../UI/FloatingButton";
import { Navigate, useNavigate } from "react-router-dom";
import TodoContext from "../../context/todoContext";

const Todo = () => {
  const [myForm, setMyForm] = useState({
    todo: "",
    priority: "",
    updatedAt: "",
    createdAt: "",
    complete: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPriority, setSearchPriority] = useState("");
  let navigate = useNavigate();
  const context = useContext(TodoContext);
  const { isLoggedIn } = useContext(TodoContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  const itemsCoches = context.todoItems.filter(
    (item) => item.complete === true
  );
  const updateCompleteItems = (id) => {
    const newTodoItems = context.todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }

      return item;
    });
    newTodoItems.sort((a, b) => {
      if (a.id === id) return 1;
      if (b.id === id) return -1;
      return 0;
    });
    context.setTodoItems(newTodoItems);
  };
  const deleteTodoItem = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
      const newTodoItems = context.todoItems.filter((item) => item.id !== id);
      context.setTodoItems(newTodoItems);
    }
  };
  const editTodoItem = (id, todo, priority) => {
    const newTodo = prompt("enter new todo :", todo);
    const newPriority = prompt("Enter new priority:", priority);
    if (newTodo !== null && newPriority !== null) {
      const newTodoItems = context.todoItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            todo: newTodo,
            priority: newPriority,
            updatedAt: new Date(),
          };
        }
        return item;
      });
      context.setTodoItems(newTodoItems);
    }
  };

  const viewDetailsItem = (id) => {
    context.todoItems.map((item) => {
      if (item.id === id) {
        navigate(`/details/${id}`);
      }
    });
  };
  const filteredTodoItems = context.todoItems.filter((item) => {
    const todo = item.todo ? item.todo.toLowerCase() : ""; // Convertir en minuscules et gérer les valeurs null/undefined
    const priority = item.priority
      ? item.priority.toString().toLowerCase()
      : ""; // Convertir en chaîne de caractères et en minuscules

    return (
      (!searchTerm || todo.includes(searchTerm.toLowerCase())) && // Filtrer par "todo" si "searchTerm" est défini
      (!searchPriority || priority.includes(searchPriority.toLowerCase())) // Filtrer par "priority" si "searchPriority" est défini
    );
  });

  return (
    <>
      <header className="text-center text-light my-4">
        <h1 className="mb-5">Todo List</h1>
        <input
          type="text"
          className="form-control m-auto mb-3"
          name="search"
          placeholder="search todos"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control m-auto"
          name="searchPriority"
          placeholder="Search todos by priority"
          value={searchPriority}
          onChange={(e) => {
            setSearchPriority(e.target.value);
          }}
        />
      </header>
      {filteredTodoItems.map((item) => (
        <TodoItem
          todoItem={item}
          updateCompleteItems={updateCompleteItems}
          key={item.id}
          deleteItems={deleteTodoItem}
          editItems={editTodoItem}
          viewItems={viewDetailsItem}
        />
      ))}
      <p className="element-checked">
        Éléments cochés : {itemsCoches.length} / {context.todoItems.length}
      </p>
      <Form addForm={myForm} setAddForm={setMyForm} />

      <FloatingButton />
    </>
  );
};
export default Todo;

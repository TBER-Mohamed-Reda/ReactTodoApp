import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Todo from "./components/Todo/Todo";

import { Navigate, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import TodoDetailsItem from "./components/Todo/TodoDetailsItem";
import TodoContext from "./context/todoContext";

import { useState } from "react";
import Login from "./components/Login/Login";
function App() {
  const generateId = () => Math.floor(Math.random() * 1000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const [todoItems, setTodoItems] = useState([
    {
      id: generateId(),
      todo: "Read books",
      complete: false,
      priority: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: generateId(),
      todo: "Journaling",
      complete: false,
      priority: 4,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: generateId(),
      todo: "Make Dinner",
      complete: false,
      priority: 2,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: generateId(),
      todo: "Push-ups",
      complete: false,
      priority: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ]);
  return (
    <div className="container">
      <TodoContext.Provider
        value={{
          todoItems,
          setTodoItems,
          login,
          logout,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <Routes>
          <Route path="/todo" element={<Navigate replace to="/" />} />
          <Route path="/about" element={<About />} />;
          <Route path="/login" element={<Login />} />;
          <Route path="/" element={<Todo />} />;
          <Route path="*" element={<NotFound />} />
          <Route path="/details/:id" element={<TodoDetailsItem />} />
        </Routes>
      </TodoContext.Provider>
    </div>
  );
}

export default App;

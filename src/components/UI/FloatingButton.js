import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./FloatingButton.scss";
import todoContext from "../../context/todoContext";

const FloatingButton = () => {
  const [checked, setChecked] = useState(false);
  const { logout } = useContext(todoContext);
  const handleClick = () => {
    setChecked(!checked);
  };

  const setUnchecked = () => {
    setChecked(false);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="buttonContainer" onBlur={setUnchecked}>
      <input
        type="checkbox"
        id="toggle"
        className={checked ? "checked" : ""}
        onClick={handleClick}
      />
      <label className="button" htmlFor="toggle"></label>
      <nav className="nav">
        <ul>
          <span>
            <Link to="/">Todo List</Link>
          </span>

          <span>
            <Link to="/about">About</Link>
          </span>

          <span>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </span>
        </ul>
      </nav>
    </div>
  );
};
export default FloatingButton;

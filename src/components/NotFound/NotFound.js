import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import TodoContext from "../../context/todoContext";

const NotFound = () => {
  const { isLoggedIn } = useContext(TodoContext);
  let navigate = useNavigate();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-page-found">
      <h1 className="pageNotFound">404 Not Found</h1>
      <p className="text-error">
        La page que vous recherchez n'a pas été trouvée.
      </p>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default NotFound;

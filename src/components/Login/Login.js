import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TodoContext from "../../context/todoContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const { login } = useContext(TodoContext);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Veuillez remplir tous les champs.");
    } else if (!isValidEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
    } else if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
    } else {
      login();
      navigate("/");
    }
  };

  return (
    <form className="text-center my-4 text-light" onSubmit={handleSubmit}>
      <h1 className="mb-4">Login Form</h1>
      <input
        type="text"
        className={`form-control mb-2`}
        id="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        className={`form-control mb-3`}
        id="password"
        placeholder="Enter your Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <p className="text-danger">{error}</p>}

      <button type="submit" className="btn-login">
        Login
      </button>
    </form>
  );
};
export default Login;

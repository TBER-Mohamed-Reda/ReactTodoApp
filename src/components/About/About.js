import { useContext, useEffect, useState } from "react";
import FloatingButton from "../UI/FloatingButton";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TodoContext from "../../context/todoContext";

const About = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id, name } = useParams();
  const { isLoggedIn } = useContext(TodoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (response.ok) {
          const jsonData = await response.json();
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setData(jsonData);
        } else {
          setError("erreur dans la requete", response.statusText);
        }
      } catch (error) {
        const errorMessage = setError("Error", error);
        console.log(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <p className="load-api">Chargement en cours...</p>;
  }
  if (!data) {
    return <p className="text-danger">erreur de la récupération des données</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>About Page</h1>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="about-container">
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <h1>
                {id} {name}
              </h1>
            </li>
          ))}
        </ul>
        <FloatingButton />
      </div>
    </>
  );
};
export default About;

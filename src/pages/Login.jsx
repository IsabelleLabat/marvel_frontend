import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import star from "../assets/Img/star.png";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    console.log(event);
    // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      console.log(response);

      handleToken(response.data.token);
      navigate("/favorites");
      //   console.log(navigate);
    } catch (error) {
      if (error.message === "Missing parameters") {
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.status === 401) {
        setErrorMessage("Email ou mot de passe invalide");
      }
      //   console.log(error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="title">
        <img className="star" src={star} alt="" />
        <h1>LOGIN</h1>
        <img className="star" src={star} alt="" />
      </div>

      <input
        className="search-input"
        id="email"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        className="search-input"
        id="password"
        type="password"
        placeholder="Mot de Passe"
        name="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input className="search-input" type="submit" value="Se connecter" />
    </form>
  );
};

export default Login;

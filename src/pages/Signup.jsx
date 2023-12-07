import axios from "axios";
import { useState } from "react";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import star from "../assets/Img/star.png";

const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState();

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
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
      //   Je fais disparaitre un éventuel message d'erreur
      setErrorMessage("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", name);
      formData.append("password", password);
      formData.append("picture", picture);

      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
        // {
        //   email: email,
        //   username: name,
        //   password: password,
        //   newsletter: Boolean,
        // }
      );
      //   console.log(data);
      //   console.log(data.token);
      //   console.log(response);

      //   Cookies.set("token", response.data.token, { expires: 15 });
      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Cookies.set("token", response.data.token, { expires: 15 });
      // Je navigue vers ma page /
      navigate("/");
    } catch (error) {
      // console.log(error.response.status); // Pour voir le message d'erreur transmis par le serveur
      // Si je reçois le message "This email already has an account"
      if (error.message === "Missing parameters") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Please fill in all fields");
      } else if (error.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one :)"
        );
      }
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="title">
        <img className="star" src={star} alt="" />
        <h1>SIGNUP</h1>
        <img className="star" src={star} alt="" />
      </div>
      <input
        className="signup-input"
        id="name"
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        value={name}
        onChange={handleNameChange}
      />

      <input
        className="signup-input"
        id="email"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        className="input-file"
        type="file"
        onChange={(event) => {
          // console.log(event);
          setPicture(event.target.files[0]);
        }}
      />
      {picture && (
        <img
          className="picture-file"
          src={URL.createObjectURL(picture)}
          alt="pic"
        />
      )}

      <input
        className="signup-input"
        id="password"
        type="password"
        placeholder="Mot de Passe"
        name="Password"
        value={password}
        onChange={handlePasswordChange}
      />

      <input className="signin-submitButton" type="submit" value="S'inscrire" />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Link to={"/login"}>
        <span className="connect">Tu as déjà un compte? Connecte-toi</span>
      </Link>
    </form>
  );
};

export default Signup;

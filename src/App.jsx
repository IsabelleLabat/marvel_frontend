import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Cookies from "js-cookie";
import { useState } from "react";

// Pages

import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import CharacterProfile from "./pages/CharacterProfile";
import ComicProfile from "./pages/ComicProfile";
import Favorites from "./pages/Favorites";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );
  const [idUser, setIdUser] = useState(Cookies.get("idUser") || null);

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token, idUser) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("idUser", idUser, { expires: 15 });

      setToken(token);
      setIdUser(idUser);
    } else {
      Cookies.remove("token");
      Cookies.remove("idUser");
      setToken(null);
      setIdUser(null);
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} idUser={idUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/comics" element={<Comics />}></Route>
        <Route path="/comics/:characterId" element={<Comics />}></Route>
        <Route path="/comic/:comicId" element={<ComicProfile />}></Route>

        <Route path="/characters" element={<Characters />}></Route>
        <Route
          path="/character/:characterId"
          element={
            <CharacterProfile
              token={token}
              handleToken={handleToken}
              idUser={idUser}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Favorites
              token={token}
              handleToken={handleToken}
              idUser={idUser}
            />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <SignUp token={token} handleToken={handleToken} idUser={idUser} />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login handleToken={handleToken} token={token} idUser={idUser} />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

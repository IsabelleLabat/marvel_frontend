import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import "./App.css";

// Pages

import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import CharacterProfile from "./pages/CharacterProfile";
import ComicProfile from "./pages/ComicProfile";
import Favorites from "./pages/Favorites";

// Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/comics" element={<Comics />}></Route>
        <Route path="/comics/:characterId" element={<Comics />}></Route>
        <Route path="/comic/:comicId" element={<ComicProfile />}></Route>

        <Route path="/characters" element={<Characters />}></Route>
        <Route
          path="/character/:characterId"
          element={<CharacterProfile />}
        ></Route>

        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

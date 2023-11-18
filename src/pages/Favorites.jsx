import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    // Get favorites from localStorage
    const characterFavorites = JSON.parse(
      localStorage.getItem("characterFavorites") || "[]"
    );
    const comicFavorites = JSON.parse(
      localStorage.getItem("comicFavorites") || "[]"
    );
    setFavorites({ ...characterFavorites, ...comicFavorites });
  }, []);
  console.log(favorites);
  return (
    <div className="container">
      <div className="flex-card">
        <div className="card">
          {Object.keys(favorites).map((id) => (
            <div className="card-infos" key={id}>
              <div className="favorite-card">
                {/* <img
                src={`${favorites[id].thumbnail.path}.${favorites[id].thumbnail.extension}`}
                alt={favorites[id].name}
              /> */}
                <h2>{favorites[id].name}</h2>
                <p>{favorites[id].description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
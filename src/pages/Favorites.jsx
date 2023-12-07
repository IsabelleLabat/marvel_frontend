import { useState, useEffect } from "react";
import star from "../assets/Img/star.png";

import axios from "axios";

// import { Link } from "react-router-dom";
const Favorites = () => {
  const [fav, setFav] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFavorite = await axios.get(
          "http://localhost:3000/favorites"
        );
        setFav(responseFavorite.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  console.log(fav);
  return (
    <div className="container">
      <div className="title">
        <img className="star" src={star} alt="" />
        <h1>FAVORITES</h1>
        <img className="star" src={star} alt="" />
      </div>
      <div>
        <div className="card-favorite">
          {Object.keys(fav).map((id) => (
            <div className="card-individual" key={id}>
              <div className="favorite-card">
                <img
                  src={`${fav[id].thumbnail.path}.${fav[id].thumbnail.extension}`}
                  alt={fav[id].name}
                />
                <h2>{fav[id].name}</h2>
                <div className="divider-favorite"></div>
                <p>{fav[id].description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

import { useState, useEffect } from "react";
import star from "../assets/Img/star.png";

import axios from "axios";

// import { Link } from "react-router-dom";
const Favorites = ({ token }) => {
  const [fav, setFav] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFav(response.config.itemId);
        console.log(response.data.itemId);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="title">
        <img className="star" src={star} alt="" />
        <h1>FAVORITES</h1>
        <img className="star" src={star} alt="" />
      </div>
      <div>
        <div className="card-favorite">
          {/* {fav.map((id) => (
            <div className="card-individual" key={id}>
              <div className="favorite-card">
                <img
                  src={`${fav[id].thumbnail.path}.${fav[id].thumbnail.extension}`}
                  alt={fav[id].name}
                />
                <h2>{fav.name}</h2>
                <div className="divider-favorite"></div>
                <p>{fav.description}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

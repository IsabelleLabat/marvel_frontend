import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const ComicProfile = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--7zwqb2nbgsj7.code.run/comic/${comicId}`
        );
        console.log(response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [comicId]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const comicFavorites = JSON.parse(
      localStorage.getItem("comicFavorites") || "[]"
    );
    setFavorites({ ...comicFavorites });
  }, []);

  const handleToggleFavorite = (id, details) => {
    // Get existing favorites from localStorage
    const existingFavorites =
      JSON.parse(localStorage.getItem("comicFavorites")) || "[]";

    // Toggle the favorite status
    const updatedFavorites = { ...existingFavorites };
    if (updatedFavorites[id]) {
      // Remove the comic from favorites
      delete updatedFavorites[id];
    } else {
      // Add the comic to favorites with additional details
      updatedFavorites[id] = { ...details };
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("comicFavorites", JSON.stringify(updatedFavorites));
  };

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <div className="profile-card">
        <div>
          <img
            src={data.data.thumbnail.path + "." + data.data.thumbnail.extension}
            alt=""
          />
        </div>
        <div className="name-title">
          <h2>{data.data.title}</h2>
          <div className="divider"></div>
          <p className="description">{data.data.description}</p>
          <button
            className="favorites-button"
            onClick={() =>
              handleToggleFavorite(data.data.comidId, {
                title: data.data.title,
                description: data.data.description,
                thumbnail: {
                  path: data.data.thumbnail.path,
                  extension: data.data.thumbnail.extension,
                },
              })
            }
          >
            Add to my favorites
          </button>
        </div>
      </div>
    </main>
  );
};
export default ComicProfile;

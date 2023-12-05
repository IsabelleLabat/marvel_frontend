import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import axios from "axios";

const CharacterProfile = () => {
  const [data, setData] = useState();
  const [dataComic, setDataComic] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  // const addFavoritesCharacter = (id) => {
  //   const newFavoritesList = [...favorites, id];
  //   setFavorites(newFavoritesList);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacter = await axios.get(
          `https://site--marvel-backend--7zwqb2nbgsj7.code.run/character/${characterId}`
        );
        // console.log(responseCharacter.data);
        setData(responseCharacter.data);

        const responseComicCharacter = await axios.get(
          `https://site--marvel-backend--7zwqb2nbgsj7.code.run/comics/${characterId}`
        );

        setDataComic(responseComicCharacter.data);
        // console.log(responseComicCharacter.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [characterId]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const characterFavorites = JSON.parse(
      localStorage.getItem("characters") || "[]"
    );

    setFavorites({ ...characterFavorites });
  }, []);

  // console.log(favorites);

  const handleToggleFavorite = (id, details) => {
    // Get existing favorites from localStorage
    const existingFavorites =
      JSON.parse(localStorage.getItem("characterFavorites")) || {};
    // Toggle the favorite status
    const updatedFavorites = { ...existingFavorites };
    if (updatedFavorites[id]) {
      // Remove the character from favorites
      delete updatedFavorites[id];
    } else {
      // Add the character to favorites with additional details
      updatedFavorites[id] = { ...details };
    }
    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem(
      "characterFavorites",
      JSON.stringify(updatedFavorites)
    );

    console.log(id);
    console.log(details);
    console.log(localStorage);
  };

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <div className="profile-card">
        <div>
          <img
            src={data.data.thumbnail.path + "." + data.data.thumbnail.extension}
            alt="avatar"
          />
        </div>
        <div className="name-title">
          <h2>{data.data.name}</h2>
          <div className="divider"></div>
          <p className="description">{data.data.description}</p>
          <button
            className="favorites-button"
            onClick={() =>
              handleToggleFavorite(data.data._id, {
                // id: characterId,
                name: data.data.name,
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
      <div>
        <h2 className="comic-list-title">Comics list</h2>
        <div className="divider"></div>
        <article className="flex-card">
          {dataComic.data.comics.map((comic) => {
            return (
              <div className="card" key={comic._id}>
                <div className="card-infos">
                  <h2>{comic.title}</h2>
                </div>
                <div className="img-card">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </main>
  );
};

export default CharacterProfile;

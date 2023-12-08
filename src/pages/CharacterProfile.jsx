import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import axios from "axios";

const CharacterProfile = ({ token }) => {
  const [data, setData] = useState();
  const [dataComic, setDataComic] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacter = await axios.get(
          `http://localhost:3000/character/${characterId}`
        );
        // console.log(responseCharacter.data);
        setData(responseCharacter.data);

        const responseComicCharacter = await axios.get(
          `http://localhost:3000/comics/${characterId}`
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

  const handleToggleFavorite = (id) => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:3000/favorites", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            itemId: {
              id: data.data._id,
              name: data.data.name,
              path: data.data.thumbnail.path,
              extension: data.data.thumbnail.extension,
            },
          });

          setFavorites(response.data.favorites);
          console.log(favorites);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      fetchData();
    } else {
      alert("You must be connected to add favorites");
    }
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
              handleToggleFavorite({
                itemId: {
                  id: data.data._id,
                  name: data.data.name,
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

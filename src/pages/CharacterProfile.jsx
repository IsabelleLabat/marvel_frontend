import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const CharacterProfile = () => {
  const [data, setData] = useState();
  const [dataComic, setDataComic] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

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
        console.log(responseComicCharacter.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [characterId]);

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
        </div>
      </div>
      <div>
        <h2>Comics list</h2>
        <article className="character-comic">
          {dataComic.data.comics.map((comic) => {
            return (
              <div className="test" key={comic._id}>
                <div className="comic-infos">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                  <p>{comic.title}</p>
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

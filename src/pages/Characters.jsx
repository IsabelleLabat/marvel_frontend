import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--7zwqb2nbgsj7.code.run/characters?limit=100&skip=0}&name=${searchTerm}`
        );
        //   console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [searchTerm]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          placeholder="Find a character ..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="flex-card">
        {data.data.results.map((result) => {
          // console.log(result);
          return (
            <Link
              className="card"
              to={`/character/${result._id}`}
              key={result._id}
            >
              <div className="card-infos">
                <h2>{result.name}</h2>
                {/* <p>{result.description}</p> */}
              </div>

              <div className="img-card">
                <img
                  src={result.thumbnail.path + "." + result.thumbnail.extension}
                  alt="portrait"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Characters;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const addEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--7zwqb2nbgsj7.code.run/comics?limit=100&skip=0}&title=${searchTerm}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
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
          placeholder="Find a comic ..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="flex-card">
        {data.data.results.map((result) => {
          return (
            <Link className="card" to={`/comic/${result._id}`} key={result._id}>
              <div className="card-infos">
                <h2>{addEllipsis(result.title, 35)}</h2>
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

export default Comics;

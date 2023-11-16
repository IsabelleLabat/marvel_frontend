import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--7zwqb2nbgsj7.code.run/characters"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <div className="flex-card">
        {data.data.results.map((result) => {
          // console.log(result);
          return (
            <Link
              className="card"
              to={`/character/${result._id}`}
              key={result._id}
            >
              <div>
                <div className="card-infos">
                  <h2>{result.name}</h2>
                  <p>{result.description}</p>
                </div>

                <div className="img-card">
                  <img
                    src={
                      result.thumbnail.path + "." + result.thumbnail.extension
                    }
                    alt="portrait"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Characters;

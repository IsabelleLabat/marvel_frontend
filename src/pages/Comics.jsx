import { useEffect, useState } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--7zwqb2nbgsj7.code.run/comics"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //   const fetchImage = async ({ path, portrait_small, extension }) => {
  //     const response = await axios.get(
  //       `https://site--marvel-backend--7zwqb2nbgsj7.code.run/comics${path}${portrait_small}${extension}`
  //     );
  //     // console.log(response.data);
  //     fetchImage();
  //   };

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <div className="flex-card">
        {data.data.results.map((result) => {
          return (
            <div className="card" key={result._id}>
              <div className="card-infos">
                <h2>{result.title}</h2>
                <p>{result.description}</p>
              </div>

              <div className="img-card">
                <img
                  src={result.thumbnail.path + "." + result.thumbnail.extension}
                  alt="portrait"
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;

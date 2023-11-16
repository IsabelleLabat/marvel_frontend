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
        </div>
      </div>
    </main>
  );
};
export default ComicProfile;

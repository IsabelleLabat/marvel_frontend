import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const CharacterProfile = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--7zwqb2nbgsj7.code.run/character/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container">
      <h1>OK</h1>

      <div>{data.name}</div>
    </main>
  );
};

export default CharacterProfile;

import axios from "axios";
import { useEffect, useState } from "react";
import "./Rank.css";

interface RankInfo {
  id: string;
  name: string;
  email: string;
  totalScore: number;
  level: number;
}

const Rank = () => {
  const [data, setData] = useState<RankInfo[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://lighthouse1.site/users/ranking",
          config
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="rank">
        <table className="rankList">
          <thead>
            <tr className="rankTitle">
              <th>Name</th>
              <th>Email</th>
              <th>Total Score</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data: RankInfo) => (
              <tr className="homeContent">
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.totalScore}</td>
                <td>{data.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Rank;

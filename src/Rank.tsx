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
        // localstorage에 저장했던 토큰 가져오기
        const token = localStorage.getItem("token");

        // 헤더에 토큰 추가
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 서버에 사용자 정보 달라고 get 요청 보내기
        const response = await axios.get(
          "https://lighthouse1.site/users/ranking",
          config
        );

        setData(response.data); // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
      } catch (error) {
        // get 실패시 console 메시지 출력
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
                <td>
                  <ol>
                    <li>{data.name}</li>
                  </ol>
                </td>
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

import "./User.css";
import userIcon from "./userIcon.png";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  name: string;
  school: string;
  email: string;
  createAt: string;
  role: string;
  level: number;
  totalScore: number;
  age: number;
  pictureUrl: string;
}

const User = () => {
  const [data, setData] = useState<UserInfo | null>(null);
  const [userLevel, setUserLevel] = useState<number>(0);
  const ratio = Math.min(Math.floor((userLevel / 100) * 100), 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://lighthouse1.site/users/my/info",
          config
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await response.data;

        setData(response.data);
        setUserLevel(data.level);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="userPage">
        <div className="userRank">
          <div className="userImg">
            <img src={userIcon} alt="유저 아이콘" className="userIcon" />
          </div>
          <div className="bar">
            <div className="barLevel">Lv. {data.level}</div>
            <div className="StyledBase">
              <div className="StyledRange" style={{ width: `${ratio}%` }} />
            </div>
          </div>
        </div>
        <div className="userInfo">
          <p className="userData">이름: {data.name}</p>
          <p className="userData">학교: {data.school}</p>
          <p className="userData">나이: {data.age}</p>
          <p className="userData">이메일: {data.email}</p>
        </div>
      </div>
    </>
  );
};

export default User;

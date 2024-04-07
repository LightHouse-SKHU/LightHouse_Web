import "./User.css";
import userIcon from "./userIcon.png";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';

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
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
          "https://lighthouse1.site/users/my/info",
          config
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await response.data;

        setData(response.data);
        setUserLevel(data.level); // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
      } catch (error) {
        // get 실패시 console 메시지 출력
        console.error("Error fetching data:", error);
        // navigate('/Login')
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
          <div>
            <div className="StyledBase">
              <div>Lv. {data.level}</div>
              <div className="StyledRange" style={{ width: `${ratio}%` }} />
            </div>
          </div>
        </div>
        <div className="userInfo">
          <p className="userData">이름: {data.name}</p>
          <p className="userData">학교: {data.school}</p>
          <p className="userData">나이: {data.age}</p>
          <p className="userData">이메일: {data.email}</p>
          <p className="userData">가입일: {data.createAt}</p>
        </div>
      </div>
    </>
  );
};

export default User;

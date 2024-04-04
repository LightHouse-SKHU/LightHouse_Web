import { Link } from "react-router-dom";
import "./Grade.css";
import axios from "axios";
import { useState } from "react";

interface GradeInfo {
  title: string;
  content: string;
  multipleChoice: string;
  imgPath: string;
  correct: string;
  score: string;
  category: string;
  grade: string;
}

const Grade = () => {
  const [data, setData] = useState<GradeInfo[]>([]);

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
        "https://lighthouse1.site/examples/all",
        config
      );

      setData(response.data); // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
    } catch (error) {
      // get 실패시 console 메시지 출력
      console.error("Error fetching data:", error);
      // navigate('/Home')
    }
  };

  fetchData();

  return (
    <>
      <div className="Grade">
        <div className="boardBtn">
          <Link to="/Question" className="Nav" id="Q1">
            전체 문제
          </Link>
          <hr />
          <Link to="/Grade1" className="Nav" id="Q2">
            1학년 문제
          </Link>
          <br />
          <Link to="/Grade2" className="Nav">
            2학년 문제
          </Link>
          <br />
          <Link to="/Grade3" className="Nav">
            3학년 문제
          </Link>
        </div>
        <div className="Level">
          {data.map((data: GradeInfo) => (
            <>
              <div>{data.title}</div>
              <br />
              <div>{data.category}</div>
              <br />
              <div>{data.grade}</div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
export default Grade;

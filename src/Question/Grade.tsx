import "./Grade.css";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();

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
        <div className="Level">
          <div className="levelT">
            <div>제목</div>
            <div>카테고리</div>
            <div>학년</div>
          </div>
          {data.map((data: GradeInfo) => (
            <>
              <Link to={`/examples/${id}`}>
                <div>{data.title}</div>
                <br />
                <div>{data.category}</div>
                <br />
                <div>{data.grade}</div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
export default Grade;
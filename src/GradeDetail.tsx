import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface QuestInfo {
  id: string;
  title: string;
  content: string;
  multipleChoice: string;
  score: number;
  grade: string;
  category: string;
  correct: string;
  correctPercentage: number;
  imgPath: string;
}

const GradeDetail: React.FC = () => {
  const [quest, setQuest] = useState<QuestInfo | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `https://lighthouse1.site/examples/${id}`,
          config
        );
        setQuest(response.data); // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
      } catch (error) {
        // get 실패시 console 메시지 출력
        console.error("Error fetching data:", error);
        // navigate('/Login')
      }
    };

    fetchQuestData();
  }, [id]); // id를 의존성 배열에 추가

  if (!quest) {
    // quest가 null인 경우 로딩 표시
    return <div>Loading...</div>;
  }

  const QuestionWrite = () => {
    navigate("/QuestionWrite");
  };

  return (
    <>
      <div className="background">
        <div>
          <h1>전체 문제</h1>
          <div className="middleList">
            <table>
              <thead>
                <tr className="boardTitle">
                  <th>No.</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>MultipleChoice</th>
                  <th>Img</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr key={quest.id}>
                  <td>{quest.id}</td>
                  <td>{quest.title}</td>
                  <td>{quest.content}</td>
                  <td>{quest.multipleChoice}</td>
                  <td>
                    <img src={quest.imgPath} alt={quest.imgPath} />
                  </td>
                  <td>{quest.category}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="boardBtn">
          <button onClick={QuestionWrite} className="writeBtn">
            글 작성
          </button>
        </div>
      </div>
    </>
  );
};

export default GradeDetail;

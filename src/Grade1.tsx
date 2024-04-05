import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./BoardDetail.css";

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

const Grade1: React.FC = () => {
  const [quest, setQuest] = useState<QuestInfo[]>([]);
  //   const { grade } = useParams<{ grade: string }>();
  const navigate = useNavigate();

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
          `https://lighthouse1.site/examples/find?grade=2`,
          config
        );
        setQuest(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Login");
      }
    };

    fetchData();
  }, [navigate]);

  if (!quest) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="background">
        <div className="leftNav">
          <Link to="/Board" className="Nav" id="board1">
            전체 문제
          </Link>
          <hr />
          <Link to="/Board" className="Nav" id="board2">
            1학년 문제
          </Link>
          <br />
          <Link to="/Board" className="Nav">
            2학년 문제
          </Link>
          <br />
          <Link to="/Board" className="Nav">
            3학년 문제
          </Link>
        </div>
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
                {quest.map((data: QuestInfo) => (
                  <>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.content}</td>
                    <td>{data.multipleChoice}</td>
                    <td>
                      <img src={data.imgPath} alt={data.imgPath} />
                    </td>
                    <td>{data.category}</td>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grade1;

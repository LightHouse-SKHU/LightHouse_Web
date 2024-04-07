import { useEffect, useState } from "react";
import "./BoardList.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Heart from "@react-sandbox/heart";

interface BoardInfo {
  id: string;
  userName: string;
  userLevel: string;
  title: string;
  content: string;
  createAt: string;
}

// interface UserInfo {
//   name: string;
// }

const BoardList: React.FC = () => {
  const [data, setData] = useState<BoardInfo[]>([]);
  const [likes, setLikes] = useState(0);
  const [active, setActive] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
          "https://lighthouse1.site/posts/find/list/all",
          config
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const BoardWrite = () => {
    navigate("/BoardWrite");
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    const updatedLikes = active ? likes - 1 : likes + 1;
    setLikes(updatedLikes);

    try {
      const response = await axios.post(
        `https://lighthouse1.site/likes/${id}`,
        {
          likes: updatedLikes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 포함한 Authorization 헤더
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data: ", error);
    }

    setActive(!active);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="background">
        <div className="board">
          <h1 className="totalBoard">전체 게시판</h1>
          <div className="boardList">
            <table>
              <tbody>
                {data.map((data: BoardInfo) => (
                  <>
                    <Link to={`/posts/find/${data.id}`} className="test">
                      <td className="testn">
                        {data.id}. {data.title}
                      </td>
                      <td>
                        Lv.{data.userLevel}&nbsp;{data.userName} <br />{" "}
                        {data.createAt.substring(0, 10)}
                      </td>
                      <td>
                        <div className="heart">
                          {likes}&nbsp;
                          <Heart
                            width={24}
                            height={24}
                            active={active}
                            onClick={handleLike}
                          />
                        </div>
                      </td>
                    </Link>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="boardBtn">
          <button onClick={BoardWrite} className="writeBtn">
            글 작성
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardList;

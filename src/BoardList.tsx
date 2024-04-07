import { useEffect, useState } from "react";
import "./BoardList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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
  const [isLiked, setIsLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
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

  const toggleLike = () => {
    setIsLiked(!isLiked); // 좋아요 상태를 반전
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
                        <div onClick={toggleLike} className="heart">
                          {isLiked ? (
                            <AiFillHeart color="red" />
                          ) : (
                            <AiOutlineHeart />
                          )}
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

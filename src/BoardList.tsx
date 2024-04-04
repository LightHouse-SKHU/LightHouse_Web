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
  creatAt: string;
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
        setData(response.data); // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
      } catch (error) {
        // get 실패시 console 메시지 출력
        console.error("Error fetching data:", error);
        // navigate('/Login')
      }
    };

    fetchData();
  }, [navigate]);

  const BoardWrite = () => {
    navigate("/BoardWrite");
  };

  // const deletePost = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const deleteResponse = await axios.delete(`https://lighthouse1.site/posts/delete/${id}`, config);
  //     console.log(deleteResponse);
  //     navigate('/list');
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // }

  const toggleLike = () => {
    setIsLiked(!isLiked); // 좋아요 상태를 반전
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="background">
        <div className="board">
          <h1 id="totalBoard">전체 게시판</h1>
          {/* <hr /> */}
          <div className="boardList">
            <table>
              <tbody>
                {data.map((data: BoardInfo) => (
                  <>
                    <Link
                      to={`/posts/find/${data.id}`}
                      className="boardContent"
                    >
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td>
                        Lv.{data.userLevel}&nbsp;{data.userName}
                      </td>
                      <td>{formatDate(data.creatAt)}</td>
                      <td>
                        <div onClick={toggleLike}>
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
                {/* <tr className="boardContent">
                  <th>No.</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>
                    <div onClick={toggleLike} id='heart'>
                      {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                    </div>
                  </th>
                </tr>
                <tr className="boardContent">
                  <th>No.</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>
                    <div onClick={toggleLike} id='heart'>
                      {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                    </div>
                  </th>
                </tr>
                <tr className="boardContent">
                  <th>No.</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>
                    <div onClick={toggleLike} id='heart'>
                      {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                    </div>
                  </th>
                </tr> */}
              </tbody>
            </table>

            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
            <div className="test">
              <div className="testn">No. Title</div>
              <div className="testu">
                User
                <br />
                Date
              </div>
              <div onClick={toggleLike} id="heart">
                {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </div>
            </div>
            {/* <hr /> */}
          </div>
        </div>
        <div className="boardBtn">
          <button onClick={BoardWrite} className="writeBtn">
            글 작성
          </button>
          <Link to="/Board" className="Nav">
            1학년 게시판
          </Link>
          <br />
          <Link to="/Board" className="Nav">
            2학년 게시판
          </Link>
          <br />
          <Link to="/Board" className="Nav">
            3학년 게시판
          </Link>
        </div>
      </div>
    </>
  );
};

export default BoardList;

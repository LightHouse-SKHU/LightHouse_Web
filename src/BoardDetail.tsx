import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BoardDetail.css";
import Heart from "@react-sandbox/heart";

interface BoardInfo {
  id: string;
  userName: string;
  userLevel: string;
  title: string;
  content: string;
  creatAt: string;
}

const BoardDetail: React.FC = () => {
  const [data, setData] = useState<BoardInfo | null>(null);
  // const [liked, setLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
  const [likes, setLikes] = useState(0); // 좋아요 수를 저장하는 state
  const [active, setActive] = useState(false);
  const { id } = useParams<{ id: string }>();
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
          `https://lighthouse1.site/posts/find/${id}`,
          config
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Login");
      }
    };

    fetchData();
  }, [navigate, id]);

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `https://lighthouse1.site/posts/delete/${id}`,
        config
      );
      console.log(response);
      navigate("/BoardList");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setActive(!active);
      if (!active) {
        const response = await axios.post(
          `https://lighthouse1.site/likes/${id}`,
          config
        );
        console.log(response);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error("Error posting likes: ", error);
    }
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
      <table>
        <thead>
          <tr className="boardTitle">
            <th>No.</th>
            <th>Title</th>
            <th>Content</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr key={data.id} className="boardContent">
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.content}</td>
            <td>
              Lv.{data.userLevel}&nbsp;{data.userName}
            </td>
            <td>{formatDate(data.creatAt)}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={deletePost} className="detailBtn">
        Delete
      </button>
      <Heart width={24} height={24} active={active} onClick={handleLike} />
      <p>{likes}</p>
      <button onClick={handleLike} />
    </>
  );
};

export default BoardDetail;

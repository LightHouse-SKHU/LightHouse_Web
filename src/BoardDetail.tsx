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
  createAt: string;
}

const BoardDetail: React.FC = () => {
  const [data, setData] = useState<BoardInfo | null>(null);
  const [likes, setLikes] = useState(0);
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
            <td>{data.createAt.substring(0, 10)}</td>
          </tr>
        </tbody>
      </table>

      <div className="test">
        <h3>
          {data.id}.&nbsp;
          {data.title}
        </h3>
        <div>
          {data.userLevel}&nbsp;
          {data.userName}
        </div>
        <div>{data.createAt.substring(0, 10)}</div>
        <div>
          <Heart width={24} height={24} active={active} onClick={handleLike} />
          {likes}
        </div>
      </div>
      <button onClick={deletePost} className="LoginBtn">
        Delete
      </button>
    </>
  );
};

export default BoardDetail;

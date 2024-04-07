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

interface CommentInfo {
  id: string;
  content: string;
}

const BoardDetail: React.FC = () => {
  const [data, setData] = useState<BoardInfo | null>(null);
  const [comment, setComment] = useState<CommentInfo[] | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get<CommentInfo[]>(
          `https://lighthouse1.site/comments/find/${id}`,
          config
        );
        setComment(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Login");
      }
    };

    fetchData();
  }, [navigate, id]);

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev); // 댓글 작성 창을 열고 닫음
  };

  const postComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `https://lighthouse1.site/comments/save/${id}`,
        { content: newComment },
        config
      );
      console.log(response);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

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

  const deleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `https://lighthouse1.site/comments/delete/${id}`,
        config
      );
      console.log(response);
      const updatedComments =
        comment?.filter((comment) => comment.id !== commentId) || [];
      setComment(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
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
      <div className="boardDetail">
        <div className="boardHead">
          <h1 className="totalBoard">
            {data.id}.&nbsp;
            {data.title}
          </h1>
          <div className="boardInfo">
            <p>
              Lv.{data.userLevel}&nbsp;{data.userName}
            </p>
            <p>{data.createAt.substring(0, 10)}</p>
          </div>
        </div>
        <div className="test">
          <p>{data.content}</p>
        </div>
        <div className="heart">
          <Heart width={24} height={24} active={active} onClick={handleLike} />
          &nbsp;
          {likes}
        </div>
        <button onClick={deletePost} className="LoginBtn">
          Delete
        </button>
        <div className="comment">
          <div className="">
            <button onClick={toggleCommentForm} className="LoginBtn">
              {showCommentForm ? "Close Comment Form" : "Write a Comment"}
            </button>
            {showCommentForm && (
              <div>
                <input
                  type="text"
                  className="writingX"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={postComment} className="LoginBtn">
                  Post Comment
                </button>
              </div>
            )}
            <div className="test">
              {comment &&
                comment.map((comment) => (
                  <>
                    <div key={comment.id}>
                      <span>{comment.content}</span>
                      <button onClick={() => deleteComment(comment.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;

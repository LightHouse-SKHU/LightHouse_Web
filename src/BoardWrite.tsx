import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BoardWrite.css";

const BoardWrite: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://lighthouse1.site/posts/save",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("저장되었습니다.");
        navigate("/BoardList");
      })
      .catch((error) => {
        console.error("Something went wrong", error);
      });
  };

  return (
    <div className="boardWrite">
      <div className="writing">
        <div>
          <div className="writingT">제목</div>
          <input
            className="writingX"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className="writingT">내용</div>
          <textarea
            className="writingY"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={postData} className="writingBtn">
          저장
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;

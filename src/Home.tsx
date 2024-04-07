import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";

interface BoardInfo {
  id: string;
  userName: string;
  userLevel: string;
  title: string;
  content: string;
  createAt: string;
}

// 이미지 슬라이드 데이터 타입 정의
interface Slide {
  src: string;
}

// 이미지 슬라이드 데이터 배열
const slides: Slide[] = [
  { src: banner1 },
  { src: banner2 },
  // 추가 이미지를 원하면 위와 같은 방식으로 추가합니다.
];

const Home: React.FC = () => {
  const [data, setData] = useState<BoardInfo[]>([]);
  const [liked, setLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
  const [likes, setLikes] = useState(0); // 좋아요 수를 저장하는 state
  const [currentSlide, setCurrentSlide] = useState(0);
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
          "https://lighthouse1.site/posts/find/list/like",
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
  }, [navigate]);

  const handleLike = () => {
    setLiked(!liked); // 좋아요 상태를 반전
    setLikes(likes + (liked ? -1 : 1)); // 좋아요 상태에 따라 likes 값을 증가시키거나 감소시킴
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="home">
        <div>
          <div className="slideshow-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={
                  index === currentSlide ? "mySlides active" : "mySlides"
                }
              >
                <img src={slide.src} alt={`Slide ${index}`} />
              </div>
            ))}
            <button className="prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
        <div className="middleList">
          <div className="homeBoard">
            <h1>인기 게시판</h1>
            <table className="homeList">
              <tbody>
                {data.map((data: BoardInfo) => (
                  <>
                    <Link to={`/posts/find/${data.id}`} className="homeContent">
                      <td className="testn">
                        {data.id}.&nbsp;{data.title}
                      </td>
                      <td>
                        Lv.{data.userLevel}&nbsp;{data.userName}
                        <br />
                        {data.createAt.substring(0, 10)}
                      </td>
                      <td>
                        <button onClick={handleLike} id="likeBtn">
                          👍 {likes} {/* 좋아요 버튼. 좋아요 수를 표시 */}
                        </button>
                      </td>
                    </Link>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="homeGrade">
            <h1>문제 바로가기</h1>
            <div className="homelist">
              <Link to="/Grade" className="homeLink">
                1학년 문제
              </Link>
              <Link to="/Grade" className="homeLink">
                2학년 문제
              </Link>
              <Link to="/Grade" className="homeLink">
                3학년 문제
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

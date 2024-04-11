import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import EverLearning from "./EverLearning.jpg";
import Heart from "@react-sandbox/heart";

interface BoardInfo {
  id: string;
  userName: string;
  userLevel: string;
  title: string;
  content: string;
  createAt: string;
}

interface Slide {
  src: string;
}

const slides: Slide[] = [
  { src: banner1 },
  { src: banner2 },
  { src: EverLearning },
];

const Home: React.FC = () => {
  const [data, setData] = useState<BoardInfo[]>([]);
  const [likes, setLikes] = useState(0);
  const [active, setActive] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
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
          "https://lighthouse1.site/posts/find/list/like",
          config
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data: ", error);
    }

    setActive(!active);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const handleEverLearningClick = async () => {
    try {
      // 서버에서 EverLearning 이미지의 주소를 가져옴
      const response = await axios.get(
        "https://lighthouse1.site/everlearning/web/1"
      );
      const imageUrl = response.data.imageUrl;

      // 이미지 주소로 이동
      window.open(imageUrl, "_blank");
    } catch (error) {
      console.error("Error fetching EverLearning image:", error);
    }
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
                onClick={
                  index === slides.length - 1
                    ? handleEverLearningClick
                    : undefined
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
                        <div className="heart">
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
      </div>
    </>
  );
};

export default Home;

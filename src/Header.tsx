import { Link, useNavigate } from "react-router-dom";
import lighthouse2 from "./lighthouse2.png";
import { FC, useEffect, useState } from "react";
import "./Header.css";

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 state 추가
  const navigate = useNavigate();

  // 로그인 상태를 로컬 스토리지에 동기화
  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(savedIsLoggedIn === "true");
  }, []);

  // 로그인/로그아웃 버튼 클릭시 동작할 함수 구현
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <div className="header">
        <div className="title">
          <Link to="/" className="title_name">
            <div className="logo">
              <img src={lighthouse2} alt="logo" />
            </div>
            <div>
              <p className="logo_text">
                Light
                <br />
                House
              </p>
            </div>
          </Link>
        </div>
        <div className="title_nav">
          <Link to="/BoardList" className="nav">
            게시판
          </Link>
          <Link to="/Rank" className="nav">
            랭킹
          </Link>
          <Link to="/User" className="nav">
            내 페이지
          </Link>
        </div>
        <div className="title_login">
          <button id="loginBtn" onClick={handleLoginLogout}>
            {isLoggedIn ? "Logout" : "Login"}{" "}
            {/* 로그인 상태에 따라 버튼 텍스트 변경 */}
          </button>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Header;

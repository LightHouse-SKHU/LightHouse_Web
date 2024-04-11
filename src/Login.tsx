import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lighthouse1.site/auth/login",
        user
      );
      const { accessToken } = response.data;

      localStorage.setItem("token", accessToken);

      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="loginF">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <div className="loginT">Email</div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="LoginI"
            />
          </div>
          <div className="login">
            <div className="loginT">Password</div>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="LoginI"
            />
          </div>
        </form>
        <button onClick={() => navigate("/Join")} className="LoginBtn">
          Join
        </button>
        <button type="submit" onClick={handleSubmit} className="LoginBtn">
          Login
        </button>
      </div>
    </>
  );
};

export default Login;

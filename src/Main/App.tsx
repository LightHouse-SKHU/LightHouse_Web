import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login.tsx";
import User from "../User/User.tsx";
import BoardList from "../Board/BoardList.tsx";
import Rank from "../User/Rank.tsx";
import Join from "../Login/Join.tsx";
import BoardWrite from "../Board/BoardWrite.tsx";
import BoardDetail from "../Board/BoardDetail.tsx";
import Home from "./Home.tsx";
import Grade from "../Question/Grade.tsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/User" element={<User />} />
      <Route path="/BoardList" element={<BoardList />} />
      <Route path="/Rank" element={<Rank />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/posts/find/:id" element={<BoardDetail />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/Grade" element={<Grade />} />
    </Routes>
  );
}

export default App;

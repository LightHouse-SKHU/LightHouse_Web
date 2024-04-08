import { Route, Routes } from "react-router-dom";
import Login from "./Login.tsx";
import User from "./User.tsx";
import BoardList from "./BoardList.tsx";
import Rank from "./Rank.tsx";
import Join from "./Join.tsx";
import BoardWrite from "./BoardWrite.tsx";
import BoardDetail from "./BoardDetail.tsx";
import Home from "./Home.tsx";
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
    </Routes>
  );
}

export default App;

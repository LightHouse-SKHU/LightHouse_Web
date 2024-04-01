import { Route, Routes } from "react-router-dom";
import Login from "./Login.tsx";
import User from "./User.tsx";
import BoardList from "./BoardList.tsx";
import Rank from "./Rank.tsx";
import Question from "./Question.tsx";
import Join from "./Join.tsx";
import BoardWrite from "./BoardWrite.tsx";
import BoardDetail from "./BoardDetail.tsx";
import Home from "./Home.tsx";
import Grade from "./Grade.tsx";
import QuestionWrite from "./QuestionWrite.tsx";
import Answer from "./Answer.tsx";
import GradeDetail from "./GradeDetail.tsx";
import QuestionDeatil from "./Question.tsx";
import Grade1 from "./Grade1.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/User" element={<User />} />
      <Route path="/BoardList" element={<BoardList />} />
      <Route path="/Rank" element={<Rank />} />
      <Route path="/Question" element={<Question />} />
      <Route path="/examples/find/:grade" element={<QuestionDeatil />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/posts/find/:id" element={<BoardDetail />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/Grade" element={<Grade />} />
      <Route path="/examples/:id" element={<GradeDetail />} />
      <Route path="/examples//find/:grade/:category" element={<Grade1 />} />
      <Route path="/QuestionWrite" element={<QuestionWrite />} />
      <Route path="/Answer" element={<Answer />} />
    </Routes>
  );
}

export default App;

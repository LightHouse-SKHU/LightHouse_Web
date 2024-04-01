import { Link, useNavigate } from "react-router-dom"
// import './A.css'
import { useState } from "react"
import axios from "axios"

const QuestionWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [multipleChoice, setMultipleChoice] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [correct, setCorrect] = useState('');
    const [score, setScore] = useState('');
    const [category, setCategory] = useState('');
    const [grade, setGrade] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const postQData = async () => {
        axios.post('https://lighthouse1.site/examples/save', { title, content, multipleChoice, imgPath, correct, score, category, grade }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                alert('저장되었습니다.');
                navigate('/');
            })
            .catch(error => {
                console.error('Something went wrong', error);
            });
    };

    

    return (
        <>
            <div className="A1">
                <div className="leftNav">
                    <Link to='/A1' className="Nav">수와 연산</Link>
                    <Link to='/A1' className="Nav">문자와 식</Link>
                    <Link to='/A1' className="Nav">함수</Link>
                    <Link to='/A1' className="Nav">기하</Link>
                    <Link to='/A1' className="Nav">확률과 통계</Link>
                </div>
                <div>
                    제목:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    내용:
                    <textarea value={content} onChange={e => setContent(e.target.value)} />
                    객관식 선지:
                    <input type="text" value={multipleChoice} onChange={e => setMultipleChoice(e.target.value)} />
                    이미지:
                    <input type="text" value={imgPath} onChange={e => setImgPath(e.target.value)} />
                    정답:
                    <input type="text" value={correct} onChange={e => setCorrect(e.target.value)} />
                    점수:
                    <input type="text" value={score} onChange={e => setScore(e.target.value)} />
                    카테고리:
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                    학년:
                    <input type="text" value={grade} onChange={e => setGrade(e.target.value)} />

                    <button onClick={postQData}>저장</button>

                </div>
            </div>
        </>
    )
}

export default QuestionWrite;
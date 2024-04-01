import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface QuestInfo {
    id: string;
    title: string;
    content: string;
    multipleChoice: string;
    score: number;
    grade: string;
    category: string;
    correct: string;
    correctPercentage: number;
    imgPath: string;
}

const Question: React.FC = () => {
    const [quest, setQuest] = useState<QuestInfo[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`https://lighthouse1.site/examples/${id}`, config);
                setQuest(response.data);

                // 댓글 불러오기
                // const commentResponse = await axios.get(`https://lighthouse1.site/comments/find/${id}`, config);
                // sestCommentShow(commentResponse.data);

                // // 현재 사용자의 userName을 얻어오는 API 요청 추가
                // const userResponse = await axios.get('https://lighthouse1.site/users/my/info', config);
                // setCurrentUser(userResponse.data);

                // // userName 확인
                // console.log('Post userName:', response.data.userName);
                // console.log('Current userName:', userResponse.data.name);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/Login');
            }
        };

        fetchData();
    }, [navigate, id]);

    if (!quest) {  // quest가 null인 경우 로딩 표시
        return <div>Loading...</div>;
    }

    const QuestionWrite = () => {
        navigate('/QuestionWrite');
    }

    return (
        <>
        <div className="background">
        <div className="leftNav">
          <Link to='/Board' className="Nav" id="board1">전체 문제</Link>
          <hr />
          <Link to={`/`} className="Nav" id="board2">1학년 문제</Link><br />
          <Link to={`/`} className="Nav">2학년 문제</Link><br />
          <Link to={`/`} className="Nav">3학년 문제</Link>
        </div>
        <div>
            <h1>전체 문제</h1>
            <div className="middleList">
                <table>
                    <thead>
                        <tr className="boardTitle">
                            <th>No.</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>MultipleChoice</th>
                            <th>Img</th>
                            <th>Category</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quest.map((data: QuestInfo) => (
                            <Link to={`/examples/${data.id}`} className="boardContent">
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.content}</td>
                                <td>{data.multipleChoice}</td>
                                <td><img src={data.imgPath} alt={data.imgPath} /></td>
                                <td>{data.category}</td>
                                <td>{data.grade}</td>
                            </Link>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className='boardBtn'>
        <button onClick={QuestionWrite} className='writeBtn'>글 작성</button>
        </div>
        </div>
        </>
    )
}

export default Question;

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

const GradeDetail: React.FC = () => {
    const [quest, setQuest] = useState<QuestInfo[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestData = async () => {
            try {
                // localstorage에 저장했던 토큰 가져오기
                const token = localStorage.getItem('token');

                // 헤더에 토큰 추가
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                // 서버에 사용자 정보 달라고 get 요청 보내기
                const response = await axios.get(`https://lighthouse1.site/examples/${id}`, config);
                setQuest(response.data);  // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것

            } catch (error) { // get 실패시 console 메시지 출력
                console.error('Error fetching data:', error);
                // navigate('/Login')
            }
        };

        fetchQuestData();
    }, [navigate, id]);  // id 추가

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
                    <Link to='/Board' className="Nav" id="board2">1학년 문제</Link><br />
                    <Link to='/Board' className="Nav">2학년 문제</Link><br />
                    <Link to='/Board' className="Nav">3학년 문제</Link>
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
                                </tr>
                            </thead>
                            <tbody>
                                {quest.map((data: QuestInfo) => (
                                    <>
                                        <td>{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>{data.content}</td>
                                        <td>{data.multipleChoice}</td>
                                        <td><img src={data.imgPath} alt={data.imgPath} /></td>
                                        <td>{data.category}</td>
                                    </>
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

export default GradeDetail;

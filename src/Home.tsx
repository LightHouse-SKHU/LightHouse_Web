import { Link, useNavigate } from "react-router-dom";
import './Home.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import banner1 from "./banner1.png"
import banner2 from "./banner2.png"

interface BoardInfo {
    id: string;
    userName: string;
    userLevel: string;
    title: string;
    content: string;
    creatAt: string;
}

const Home: React.FC = () => {
    const [data, setData] = useState<BoardInfo[]>([]);
    const [liked, setLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
    const [likes, setLikes] = useState(0); // 좋아요 수를 저장하는 state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
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
                const response = await axios.get('https://lighthouse1.site/posts/find/list/all', config);

                setData(response.data);  // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
            } catch (error) { // get 실패시 console 메시지 출력
                console.error('Error fetching data:', error);
                // navigate('/Home')
            }
        };

        fetchData();
    }, [navigate]);

    const handleLike = () => {
        setLiked(!liked); // 좋아요 상태를 반전
        setLikes(likes + (liked ? -1 : 1)); // 좋아요 상태에 따라 likes 값을 증가시키거나 감소시킴
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    if (!data) {
        return <div>Loading...</div>;
    }



    return (
        <>
            <div className="home">
                {/* <div className="leftNav">
                    <Link to='/Board' className="Nav" id="board1">전체 게시판</Link>
                    <hr />
                    <Link to='/Board' className="Nav" id="board2">1학년 게시판</Link><br />
                    <Link to='/Board' className="Nav">2학년 게시판</Link><br />
                    <Link to='/Board' className="Nav">3학년 게시판</Link>
                </div> */}
                <div className="bannerFlow">
                    <div className="bannerContainer">
                        <div className="bannerImg">
                            <img src={banner1} alt="banner1" />
                        </div>
                        <div className="bannerImg">
                            <img src={banner2} alt="banner2" />
                        </div>
                    </div>
                </div>
                <div className="middleList">
                    <h1>전체 게시판</h1>
                    <div>
                        <table className="homeList">
                            <thead>
                                <tr className="homeTitle">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Like</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data: BoardInfo) => (
                                    <>
                                        <Link to={`/posts/find/${data.id}`} className="homeContent">
                                            <td>{data.id}</td>
                                            <td>{data.title}</td>
                                            <td>Lv.{data.userLevel}&nbsp;{data.userName}</td>
                                            <td>{formatDate(data.creatAt)}</td>
                                            <td>
                                                <button onClick={handleLike} id="likeBtn">
                                                    👍 {likes} {/* 좋아요 버튼. 좋아요 수를 표시 */}
                                                </button>
                                            </td>
                                        </Link>
                                    </>
                                ))}
                                <tr className="homeContent">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Like</th>
                                </tr>
                                <tr className="homeContent">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Like</th>
                                </tr>
                                <tr className="homeContent">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Like</th>
                                </tr>
                                <tr className="homeContent">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Like</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="rightNav">
                    <div id="grade">문제 바로가기</div>
                    <div>
                        <div>
                            <Link to='/grade1' className="question">
                                1학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/grade2' className="question">
                                2학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/grade3' className="question">
                                3학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Home;
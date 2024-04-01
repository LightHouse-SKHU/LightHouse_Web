import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Answer = () => {
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('token');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const writeComment = async () => {
        axios.post(`https://lighthouse1.site/comments/save/${id}`, { comment }, {
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
    }

    return (
        <div>
            Answer:
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />

            <button onClick={writeComment}>저장</button>
        </div>
    )
}

export default Answer;
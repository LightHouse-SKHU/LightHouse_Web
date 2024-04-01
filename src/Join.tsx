import React, { useState } from 'react';
import axios from 'axios';
import './Join.css'
import { useNavigate } from 'react-router-dom'; // useNavigate import

interface Submission {
  email: string;
  password: string;
  authority: 'ROLE_STUDENT' | 'ROLE_TEACHER';
  name: string;
  age: string;
  nation: string;
  school: string;
}

const Join: React.FC = () => {
  const [user, setUser] = useState<Submission>({ email: '', password: '', authority: 'ROLE_STUDENT', name: '', age: '', nation: '', school: '' });
  const navigate = useNavigate(); // useNavigate hook 추가

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({
      ...user,
      authority: event.target.value as 'ROLE_STUDENT' | 'ROLE_TEACHER',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // First step of signup
      await axios.post('https://lighthouse1.site/auth/signup', {
        email: user.email,
        password: user.password,
        authority: user.authority,
        name: user.name,
        age: user.age,
        nation: user.nation,
        school: user.school,
      });

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/Login'); // signup 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='JoinForm'>
      <div className='WritingJ'>
        <div className='JoinLeft'>
          <label className='JoinName'>Email: </label> &nbsp;&nbsp;
          <label className='JoinName'>Password: </label> &nbsp;&nbsp;
          <label className='JoinName'>Role: </label> &nbsp;&nbsp;
          <label className='JoinName'>Name: </label> &nbsp;&nbsp;
          <label className='JoinName'>Age: </label> &nbsp;&nbsp;
          <label className='JoinName'>Nation: </label> &nbsp;&nbsp;
          <label className='JoinName'>School: </label> &nbsp;&nbsp;
        </div>
        <div className='JoinRight'>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className='JoinInput'
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            className='JoinInput'
          />
          <select name="role" value={user.authority} onChange={handleRoleChange} className='JoinInput'>
            {/* <option value="">Select role</option> */}
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
            className='JoinInput'
          />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
            placeholder="Age"
            className='JoinInput'
          />
          <input
            type="text"
            name="nation"
            value={user.nation}
            onChange={handleInputChange}
            placeholder="Nation"
            className='JoinInput'
          />
          <input
            type="text"
            name="school"
            value={user.school}
            onChange={handleInputChange}
            placeholder="School"
            className='JoinInput'
          />
        </div>
      </div>
      <button type="submit" className='JoinBtn'>Sign Up</button>
    </form>
    <div className='joinF'>
    <form>
      <div className='join'>
                        <div className='joinT'>Email</div>
                        <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className='JoinI'
          />
          </div>
                    <div className='join'>
                        <div className='joinT'>Password</div>
                        <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            className='JoinI'
          />
                    </div>
                    <div className='join'>
                        <div className='joinT'>Role</div>
                        <select name="role" value={user.authority} onChange={handleRoleChange} className='JoinI'>
            {/* <option value="">Select role</option> */}
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
                    </div>
                    <div className='join'>
                        <div className='joinT'>Name</div>
                        <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
            className='JoinI'
          />
                    </div>
                    <div className='join'>
                        <div className='loginT'>Age</div>
                        <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
            placeholder="Age"
            className='JoinInput'
          />
                    </div>
                    <div className='login'>
                        <div className='loginT'>Nation</div>
                        <input
            type="text"
            name="nation"
            value={user.nation}
            onChange={handleInputChange}
            placeholder="Nation"
            className='JoinInput'
          />
                    </div>
                    <div className='login'>
                        <div className='loginT'>School</div>
                        <input
            type="text"
            name="school"
            value={user.school}
            onChange={handleInputChange}
            placeholder="School"
            className='JoinInput'
          />
                    </div>
    </form>
    <button type="submit" className='JoinBtn'>Sign Up</button>
    </div>
    </>
  );
};

export default Join;

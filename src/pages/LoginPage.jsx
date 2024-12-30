import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../lib/api/api';

// 스타일 컴포넌트
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 402px;
  height: 874px;
  background-color: #4973E3;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 33px 33px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const BuddyDimImg = styled.img`
  width: 100%;
  height: 352px;
  z-index: 1;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!id || !password) {
      setError('ID와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setError('');

    try {
      // 로그인 API 호출
      login({ id, password }).then((res) => {
        console.log(res);
        if(res.status === 200) {
          navigate('/timetable');
          localStorage.setItem('token', res.data.token);
        }
      });

    } catch (err) {
      setError('아이디 또는 비밀번호가 잘못되었습니다.'); // 로그인 실패 시 에러 처리
      console.error(err);
    }
  };
  
  return (
    <LoginContainer>
      <BuddyDimImg src="/images/buddydim.png" alt="BuddyDim" />
      <Form onSubmit={handleSubmit}>
        <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#909090' }}>
          Sejong University 로그인<br />
          학번과 비밀번호를 입력해주세요.
        </p>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Enter your student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={!id || !password}>
          로그인
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;

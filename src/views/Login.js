import React, { useState } from 'react'
import styled from 'styled-components'
import LoginBg from '../assets/images/loginImg.jpeg'
import Check from '../components/atom/Check'
import Input from '../components/atom/Input'
import Button from '../components/atom/Button'
import kakao from '../assets/images/kakao.jpeg'
import Text from '../components/atom/Text'

const StyledLogin = styled.div`
  display: flex;

  img {
    height: 100vh;
    width: 50%;
    object-fit: cover;
  }
  .login-container {
    width: 50%;
    padding: 200px;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .login-options {
    display: flex;

    & > button {
      width: 33%;
    }
  }
  .login-social {
    .social-item {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      height: 60px;
      padding: 0 20px 0 20px;
      border-bottom: 1px solid #e5e9f2;
      font-size: 14px;
      box-sizing: border-box;
    }
  }
`

function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [keepLogin, setKeepLogin] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'id') {
      setId(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if ((name = 'keepLogin')) {
      console.log(value)
      setKeepLogin(value)
    }
  }
  return (
    <StyledLogin>
      <img src={LoginBg} alt="bg" />
      <div className="login-container">
        <div className="login-form">
          <Input
            label="Identify"
            isLabel={true}
            placeholder="아이디"
            name="id"
            value={id}
            type="email"
            onChange={onChange}
          />
          <Input
            style={{ marginTop: 30 }}
            label="Password"
            isLabel={true}
            placeholder="패스워드"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <Check
            label="로그인 상태 유지"
            isLabel={true}
            checked={keepLogin}
            name="keepLogin"
            onChange={onChange}
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
          <Button text="로그인" style={{ width: '100%' }} />
        </div>
        <div className="login-options">
          <Button
            text="아이디찾기"
            bgColor="transparent"
            color="#5d5d5d"
            fontSize="12px"
          />
          <Button
            text="비밀번호찾기"
            bgColor="transparent"
            color="#5d5d5d"
            fontSize="12px"
          />
          <Button
            text="회원가입"
            bgColor="transparent"
            color="#5d5d5d"
            fontSize="12px"
          />
        </div>
        <div className="login-social">
          <div className="social-item">
            <img
              src={kakao}
              alt="kakao"
              style={{ width: '1.5rem', height: '1.5rem', marginRight: '1rem' }}
            />
            <Text text="카카오로 시작하기" />
          </div>
        </div>
      </div>
    </StyledLogin>
  )
}

export default Login

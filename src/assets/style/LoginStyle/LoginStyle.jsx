import { Input } from 'antd';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginImageDisplayBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.backgroundimagesrc});
  background-position: center;
  background-size: cover;

  @media (max-width: 600px) {
    display: none;
  }
`;

const LoginBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LoginFormBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export { LoginContainer, LoginImageDisplayBox, LoginBox, LoginFormBox };

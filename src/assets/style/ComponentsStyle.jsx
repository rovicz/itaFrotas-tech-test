import { Button, Form, Input, Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;
const { Search } = Input;

const StyledLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
`;

const StyledHeader = styled(Header)`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 16.1px 0px #00000040;

  @media (max-width: 600px) {
    padding: 0 15px;
  }
`;

const StyledContent = styled(Content)`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 40px;
`;

const StyledSearchInput = styled(Search)`
  min-width: 330px;
  width: 20%;
  height: 40px;
  border-radius: 12px;

  input {
    height: 40px;
  }

  .ant-btn {
    border-radius: 12px;
    height: 40px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  width: 100%;
  height: 40px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
`;

const RedAsterisk = styled.span`
  color: red;
`;

const BlueCricle = styled.div`
  background-color: #fff;
  border: 5px solid #1677ff;
  border-radius: 50%;
  padding: 0.325rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

export {
  StyledLayout,
  StyledHeader,
  StyledContent,
  StyledForm,
  StyledInput,
  StyledSearchInput,
  StyledPasswordInput,
  StyledButton,
  RedAsterisk,
  BlueCricle,
  Title,
};

// react hooks
import React, { useEffect } from 'react';

// antComponents
import { Button, Form, Input, Layout, message, Space } from 'antd';

// store & redux
import { loginStart } from '../../store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

// assets (images, styles & more)
import BackgroundFrotasImage from '../../assets/images/frotas-image.jpg';

// styles do loginStyle
import {
  LoginContainer,
  LoginBox,
  LoginImageDisplayBox,
  LoginFormBox,
} from '../../assets/style/LoginStyle/LoginStyle';

// styles gerais do ComponentsStyle
import {
  RedAsterisk,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLayout,
  StyledPasswordInput,
} from '../../assets/style/ComponentsStyle';

// gerenciador do form de login
import { useForm, Controller } from 'react-hook-form';

// page responsável pelo formulário de login.
// documentação do useForm em caso de manuntenção: https://react-hook-form.com/docs/useform.

// Test Login:
// email: eve.holt@reqres.in
// password: cityslicka

export const Auth = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.userData);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userData) => {
    dispatch(loginStart(userData));
  };

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        messageApi.error('Houve um erro ao tentar fazer o login.');
        return;
      }
    }
  }, [error, isLoading, messageApi]);

  return (
    <StyledLayout>
      <LoginContainer>
        {contextHolder}
        <LoginImageDisplayBox backgroundimagesrc={BackgroundFrotasImage} />
        <LoginBox>
          <LoginFormBox>
            <StyledForm
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              onFinish={() => {
                return new Promise((resolve) => {
                  handleSubmit(onSubmit)();
                  resolve();
                });
              }}
            >
              <Form.Item
                name="email"
                label={
                  <Space>
                    <RedAsterisk>*</RedAsterisk> Email
                  </Space>
                }
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email ? errors.email.message : ''}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Por favor, informe seu email',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Formato de email inválido',
                    },
                  }}
                  render={({ field }) => (
                    <StyledInput
                      {...field}
                      placeholder="Seu email ou usuário"
                      data-testid="emailInput"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <Space>
                    <RedAsterisk>*</RedAsterisk> Senha
                  </Space>
                }
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password.message : ''}
              >
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'A senha é obrigatória',
                  }}
                  render={({ field }) => (
                    <StyledPasswordInput
                      {...field}
                      placeholder="Sua senha"
                      data-testid="passwordInput"
                    />
                  )}
                />
              </Form.Item>
              <StyledButton
                type="primary"
                htmlType="submit"
                data-testid="submitButton"
                disabled={isLoading}
              >
                Entrar
              </StyledButton>
            </StyledForm>
          </LoginFormBox>
        </LoginBox>
      </LoginContainer>
    </StyledLayout>
  );
};

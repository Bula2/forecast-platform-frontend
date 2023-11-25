import React, { useContext, useState } from 'react';

import { Alert, Button, Form, Input, Typography, message } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { IAuthUser } from '../../types/userTypes';

const { Content } = Layout;
const { Title, Text } = Typography;

export const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const onFinish = async (values: IAuthUser) => {
    setIsError(false);
    const answer = await loginUser(values);
    if (answer === 'success') {
      navigate('/');
    } else {
      setIsError(true);
    }
  };

  return (
    <Layout className="layout">
      {isError && (
        <Alert
          message="Неверный логин или пароль"
          type="error"
          showIcon
          closable
        />
      )}
      <Content className="flex justify-center items-center h-screen">
        <Form layout="vertical" className="w-400 p-10" onFinish={onFinish}>
          <Title level={2}>Авторизация</Title>
          <hr />
          <Form.Item label="Логин" name="username">
            <Input size="large" type="text" />
          </Form.Item>
          <Form.Item label="Пароль" name="password">
            <Input size="large" type="password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="contained-btn"
          >
            Войти
          </Button>
          <Text className="login-or-reg__link">
            {'Нет аккаунта? '}
            <Link to={'/registration'}>Зарегистрироваться</Link>
          </Text>
        </Form>
      </Content>
    </Layout>
  );
};

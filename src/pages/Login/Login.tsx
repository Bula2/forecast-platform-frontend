import React from 'react';

import { Button, Form, Input, Typography, message } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    navigate('/');
  };

  return (
    <Layout className="layout">
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

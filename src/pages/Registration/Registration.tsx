import React from 'react';

import { Button, Form, Typography, message } from 'antd';
import { Input } from 'antd';

import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

export const Registration = () => {
  const onFinish = async (values: any) => {};

  return (
    <Layout className="layout">
      <Content className="flex justify-center items-center h-screen">
        <Form layout="vertical" className="w-400 p-10" onFinish={onFinish}>
          <Title level={2}>Регистрация</Title>
          <hr />
          <Form.Item label="Имя" name="name">
            <Input size="large" type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input size="large" type="email" />
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
            Зарегистрироваться
          </Button>
          <Text className="login-or-reg__link">
            {'Уже есть аккаунт? '}
            <Link to={'/login'}>Войти</Link>
          </Text>
        </Form>
      </Content>
    </Layout>
  );
};

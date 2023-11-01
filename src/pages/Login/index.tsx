import React from 'react';

import { Button, Form, Typography, message } from 'antd';

import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-400 p-10" onFinish={onFinish}>
        <Title level={2}>Авторизация</Title>
        <hr />
        <Form.Item label="Email" name="email">
          <input type="email" />
        </Form.Item>
        <Form.Item label="Пароль" name="password">
          <input type="password" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="contained-btn"
        >
          Войти
        </Button>
        <Link className="registration-link" to={'/registration'}>
          Нет аккаунта? <strong>Зарегистрироваться</strong>
        </Link>
      </Form>
    </div>
  );
};

export default Login;

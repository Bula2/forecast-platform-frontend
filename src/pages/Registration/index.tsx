import React from 'react';

import { Button, Form, Typography, message } from 'antd';

import { Link } from 'react-router-dom';

const { Title } = Typography;

const Registration = () => {
  const onFinish = async (values: any) => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-400 p-10" onFinish={onFinish}>
        <Title level={2}>Регистрация</Title>
        <hr />
        <Form.Item label="Имя" name="name">
          <input type="text" />
        </Form.Item>
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
          Зарегистрироваться
        </Button>
        <Link className="registration-link" to={'/login'}>
          Уже есть аккаунт? <strong>Войти</strong>
        </Link>
      </Form>
    </div>
  );
};

export default Registration;

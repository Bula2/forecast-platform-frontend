import React, { useContext, useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Form,
  Input,
  Layout,
  Space,
  Typography,
  message,
} from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { MyLoader } from '../../components/MyLoader/MyLoader';
import { Link } from 'react-router-dom';

import styles from './Registration.module.scss';
import { RegisterUser } from '../../types';

const { Content } = Layout;
const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
};

export const Registration = () => {
  const [form] = Form.useForm();
  // const { registerUser } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: RegisterUser) => {
    message.success(
      `К сожалению в Моковой версии нельзя создать пользователя!`
    );
    // setIsError(false);
    // setIsLoading(true);
    // const answer = await registerUser(values);
    // if (answer.type === 'error') {
    //   setIsLoading(false);
    //   setIsError(true);
    // }
  };

  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.backgroundImage}></div>
        <Form
          form={form}
          name="registration"
          layout="vertical"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={2} className={styles.title}>
            {'Регистрация'}
          </Title>
          <div className={styles.field}>
            <Form.Item<FieldType> name="name" label="Имя">
              <Input
                className={styles.input}
                name="name"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Имя"
              />
            </Form.Item>
          </div>
          <div className={styles.field}>
            <Form.Item<FieldType>
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Введите email' },
                {
                  pattern: new RegExp(
                    /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]/
                  ),
                  message: 'Введите корректный email',
                },
              ]}
            >
              <Input
                className={styles.input}
                name="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
          </div>
          <div className={styles.field}>
            <Form.Item<FieldType>
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: 'Введите пароль' },
                // {
                //   pattern: new RegExp(/[a-zA-Z0-9]{4,}/),
                //   message:
                //     'Пароль должен содержать не менее 8 символов (без кириллицы)',
                // },
              ]}
            >
              <Input.Password
                className={styles.input}
                name="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              block
              className={styles.button}
              htmlType="submit"
            >
              {isLoading ? <MyLoader /> : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
          {isError && (
            <Space direction="vertical" className={styles.alert}>
              <Alert
                message="Пользователь с таким email уже существует"
                type="error"
                showIcon
                closable
                onClose={() => setIsError(false)}
              />
            </Space>
          )}
          <Text className={styles.link}>
            {'Уже есть аккаунт? '}
            <Link to={'/login'}>Войти</Link>
          </Text>
        </Form>
      </Content>
    </Layout>
  );
};

import React, { useContext, useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
  Typography,
} from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { MyLoader } from '../../components/MyLoader/MyLoader';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import { IAuthUser } from '../../types';

const { Content } = Layout;
const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { loginUser } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: IAuthUser) => {
    setIsError(false);
    setIsLoading(true);
    const answer = await loginUser({
      email: values.email,
      password: values.password,
    });
    if (answer.type === 'error') {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.backgroundImage}></div>
        <Form
          name="login"
          form={form}
          layout="vertical"
          className={styles.form}
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Title level={2}>{'Авторизация'}</Title>
          <div className={styles.field}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
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
              label="Пароль"
              name="password"
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
          <div className={styles.field}>
            <Form.Item valuePropName="checked" name="remember">
              <Checkbox className={styles.checkbox}>
                {'Запомнить меня'}
              </Checkbox>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              block
              className={styles.button}
              htmlType="submit"
            >
              {isLoading ? <MyLoader /> : 'Войти'}
            </Button>
          </Form.Item>
          {isError && (
            <Space direction="vertical" className={styles.alert}>
              <Alert
                message="Неверный логин или пароль"
                type="error"
                showIcon
                closable
                onClose={() => setIsError(false)}
              />
            </Space>
          )}
          <Text className={styles.link}>
            {'Нет аккаунта? '}
            <Link to={'/registration'}>{'Зарегистрироваться'}</Link>
          </Text>
          {isForgotPassword ? (
            <Space direction="vertical" className={styles.alert}>
              <Alert
                message="Для восстановления напишите нам на почту test@mail.com"
                type="info"
                showIcon
                closable
                onClose={() => setIsForgotPassword(false)}
              />
            </Space>
          ) : (
            <Text
              className={styles.fogrot}
              onClick={() => setIsForgotPassword(true)}
            >
              <Link to={''}>{'Забыли пароль?'}</Link>
            </Text>
          )}
        </Form>
      </Content>
    </Layout>
  );
};

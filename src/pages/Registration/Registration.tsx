import { useContext, useState } from 'react';
import { Alert, Button, Space, Typography } from 'antd';
import cx from 'classnames';
import { Field, Form, Formik } from 'formik';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { MyLoader } from '../../components/MyLoader/MyLoader';

import styles from './Registration.module.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

export const Registration = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateUsername = (value: string) => {
    if (!value) {
      return 'Обязательное поле';
    }
  };
  const validateEmail = (value: string) => {
    if (!value) {
      return 'Обязательное поле';
    } else {
      if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]/.test(value)) {
        return 'Введите валидный email';
      }
    }
  };
  const validatePassword = (value: string) => {
    if (!value) {
      return 'Обязательное поле';
    }
    // else {
    //   if (!/[a-zA-Z0-9]{4,}/.test(value))
    //     return 'Пароль должен содержать не менее 8 символов (без кириллицы)';
    // }
  };
  return (
    <Layout>
      <Content className="flex justify-center items-center h-screen">
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
          }}
          onSubmit={async (values) => {
            setIsError(false);
            setIsLoading(true);
            console.log(values);
            setIsLoading(false);
            setIsError(true);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <Title level={2} className={styles.title}>
                {'Регистрация'}
              </Title>

              <div className={cx(styles.field)}>
                <label
                  className={cx(
                    styles.label,
                    errors.username && touched.username && styles.red
                  )}
                  htmlFor="username"
                >
                  {'Логин'}
                </label>
                <Field
                  id="username"
                  name="username"
                  validate={validateUsername}
                  className={cx(
                    styles.input,
                    errors.username && touched.username && styles.red
                  )}
                ></Field>
                {errors.username && touched.username && (
                  <div className={styles.errors}>{errors.username}</div>
                )}
              </div>

              <div className={cx(styles.field)}>
                <label
                  className={cx(
                    styles.label,
                    errors.email && touched.email && styles.red
                  )}
                  htmlFor="email"
                >
                  {'Email'}
                </label>
                <Field
                  id="email"
                  name="email"
                  validate={validateEmail}
                  className={cx(
                    styles.input,
                    errors.email && touched.email && styles.red
                  )}
                ></Field>
                {errors.email && touched.email && (
                  <div className={styles.errors}>{errors.email}</div>
                )}
              </div>

              <div className={styles.field}>
                <label
                  className={cx(
                    styles.label,
                    errors.password && touched.password && styles.red
                  )}
                  htmlFor="password"
                >
                  {'Пароль'}
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  validate={validatePassword}
                  className={cx(
                    styles.input,
                    errors.password && touched.password && styles.red
                  )}
                ></Field>
                {errors.password && touched.password && (
                  <div className={styles.errors}>{errors.password}</div>
                )}
              </div>
              <Button
                type="primary"
                block
                className={styles.button}
                htmlType="submit"
              >
                {isLoading ? <MyLoader /> : 'Войти'}
              </Button>
              {isError && (
                <Space direction="vertical" style={{ width: '400px' }}>
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
                {'Уже есть аккаунт? '}
                <Link to={'/login'}>Войти</Link>
              </Text>
            </Form>
          )}
        </Formik>
      </Content>
    </Layout>
  );
};

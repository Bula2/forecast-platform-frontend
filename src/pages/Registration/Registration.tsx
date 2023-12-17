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
  const { registerUser } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
            name: '',
            password: '',
            email: '',
          }}
          onSubmit={async (values) => {
            setIsError(false);
            setIsLoading(true);
            const answer = await registerUser(values);
            if (answer.type === 'error') {
              setIsLoading(false);
              setIsError(true);
            }
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
                    errors.email && touched.email && styles.red
                  )}
                  htmlFor="email"
                >
                  {'Email'}
                  <span className={styles.red}>{'*'}</span>
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

              <div className={cx(styles.field)}>
                <label
                  className={cx(
                    styles.label,
                    errors.name && touched.name && styles.red
                  )}
                  htmlFor="name"
                >
                  {'Имя'}
                </label>
                <Field
                  id="name"
                  name="name"
                  className={cx(
                    styles.input,
                    errors.name && touched.name && styles.red
                  )}
                ></Field>
                {errors.name && touched.name && (
                  <div className={styles.errors}>{errors.name}</div>
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
                  <span className={styles.red}>{'*'}</span>
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
                {isLoading ? <MyLoader /> : 'Зарегестрироваться'}
              </Button>
              {isError && (
                <Space direction="vertical" style={{ width: '400px' }}>
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
          )}
        </Formik>
      </Content>
    </Layout>
  );
};

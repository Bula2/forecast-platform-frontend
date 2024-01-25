import { Button, Divider, Form, Input, Statistic, Typography } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import styles from './Settings.module.scss';
import { ForecastContext } from '../../context';

const { Title, Text, Paragraph } = Typography;

export const Settings = () => {
  const { user } = useContext(AuthContext);
  const { allForecasts } = useContext(ForecastContext);
  const [isFirstNameChange, setIsFirstNameChange] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  // First_name functions
  const onFirstNameFinish = (values: { first_name: string }) => {
    console.log(values);
    setIsFirstNameChange(false);
  };
  const onFirstNameButtonClick = () => setIsFirstNameChange(true);
  const onFirstNameButtonCancelClick = () => setIsFirstNameChange(false);

  // Email functions
  const onEmailFinish = (values: { email: string }) => {
    console.log(values);
    setIsFirstNameChange(false);
  };
  const onEmailButtonClick = () => setIsEmailChange(true);
  const onEmailButtonCancelClick = () => setIsEmailChange(false);

  // Password functions
  const onPasswordFinish = (values: { password: string }) => {
    console.log(values);
    setIsPasswordChange(false);
  };
  const onPasswordButtonClick = () => setIsPasswordChange(true);
  const onPasswordButtonCancelClick = () => setIsPasswordChange(false);

  return (
    <div className={styles.wrapper}>
      <Title level={3}>{'Настройки'}</Title>
      <div className={styles.content}>
        <Divider orientation="left">{'Персональные данные'}</Divider>

        <Form
          name="first_name_form"
          layout={'horizontal'}
          onFinish={onFirstNameFinish}
          initialValues={{
            ['first_name']: user?.first_name,
          }}
        >
          <div className={styles.content__item}>
            <Form.Item
              label={<Text className={styles.content__label}>{'Имя'}</Text>}
              name="first_name"
            >
              <Input
                size="middle"
                className={styles.content__input}
                disabled={!isFirstNameChange}
              />
            </Form.Item>
            <Form.Item className={styles.buttonWrapper}>
              {isFirstNameChange && (
                <Button type="primary" htmlType="submit" size="middle">
                  {'Изменить'}
                </Button>
              )}
            </Form.Item>
            {!isFirstNameChange ? (
              <Button
                type="primary"
                size="middle"
                onClick={onFirstNameButtonClick}
                className={styles.content__editButton}
              >
                {'Редактировать'}
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                size="middle"
                onClick={onFirstNameButtonCancelClick}
              >
                {'Отмена'}
              </Button>
            )}
          </div>
        </Form>

        <Form
          name="email_form"
          layout={'horizontal'}
          onFinish={onEmailFinish}
          initialValues={{
            ['email']: user?.email,
          }}
        >
          <div className={styles.content__item}>
            <Form.Item
              label={<Text className={styles.content__label}>{'Email'}</Text>}
              name="email"
            >
              <Input
                size="middle"
                className={styles.content__input}
                disabled={!isEmailChange}
              />
            </Form.Item>
            <Form.Item className={styles.buttonWrapper}>
              {isEmailChange && (
                <Button type="primary" htmlType="submit" size="middle">
                  {'Изменить'}
                </Button>
              )}
            </Form.Item>
            {!isEmailChange ? (
              <Button
                type="primary"
                size="middle"
                onClick={onEmailButtonClick}
                className={styles.content__editButton}
              >
                {'Редактировать'}
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                size="middle"
                onClick={onEmailButtonCancelClick}
              >
                {'Отмена'}
              </Button>
            )}
          </div>
        </Form>

        <Form
          name="password_form"
          layout={'horizontal'}
          onFinish={onPasswordFinish}
        >
          <div className={styles.content__item}>
            <Form.Item
              label={<Text className={styles.content__label}>{'Пароль'}</Text>}
              name="password"
            >
              <Input
                size="middle"
                className={styles.content__input}
                disabled={!isPasswordChange}
              />
            </Form.Item>
            <Form.Item className={styles.buttonWrapper}>
              {isPasswordChange && (
                <Button type="primary" htmlType="submit" size="middle">
                  {'Изменить'}
                </Button>
              )}
            </Form.Item>
            {!isPasswordChange ? (
              <Button
                type="primary"
                size="middle"
                onClick={onPasswordButtonClick}
                className={styles.content__editButton}
              >
                {'Редактировать'}
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                size="middle"
                onClick={onPasswordButtonCancelClick}
              >
                {'Отмена'}
              </Button>
            )}
          </div>
        </Form>

        <Divider orientation="left">{'Информация о системе'}</Divider>

        <Statistic title="Количество прогнозов" value={allForecasts.length} />
      </div>
    </div>
  );
};

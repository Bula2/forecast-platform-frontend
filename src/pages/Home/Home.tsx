import React, { useContext } from 'react';
import { Divider, List, Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import { fastMenuItems } from './utils/constants';

const { Title, Text, Paragraph } = Typography;

export const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <Title level={3}>
          {`Добро пожаловать, ${user.first_name || user.email}!`}
        </Title>
      )}
      <Divider orientation="left"></Divider>
      <Paragraph className={styles.paragraph}>
        {
          'Вас приветствует Forecast Platform - универсальная система прогнозирования динамических показателей.'
        }
      </Paragraph>
      {!user && (
        <Paragraph className={styles.paragraph}>
          {'Для полноценной работы с системой - '}
          <Text className={styles.link}>
            <Link to={'/login'}>{'Авторизуйтесь'}</Link>
          </Text>
          {'!'}
        </Paragraph>
      )}
      <List
        size="large"
        header={
          <Text strong className={styles.menu__title}>
            {'Быстрое меню'}
          </Text>
        }
        bordered
        dataSource={fastMenuItems}
        renderItem={(item) => (
          <List.Item>
            <Text className={styles.link}>
              <Link to={item.link}>{item.text}</Link>
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
};
